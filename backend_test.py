import requests
import sys
import json
import io
from datetime import datetime

class ResumeMatcherAPITester:
    def __init__(self, base_url="https://aijobmatcher.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.sample_resume_text = """
        Software Engineer with 5 years experience in Python, React, MongoDB, AWS. 
        Strong background in machine learning and data analysis. 
        Experience with FastAPI, Docker, and cloud technologies.
        Bachelor's degree in Computer Science.
        """
        self.sample_job_description = """
        Looking for Senior Software Engineer with Python, JavaScript, React, AWS experience. 
        Must have experience with databases and cloud technologies.
        Machine learning experience preferred.
        """

    def run_test(self, name, method, endpoint, expected_status, data=None, files=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {}
        
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=30)
            elif method == 'POST':
                if files:
                    response = requests.post(url, files=files, timeout=30)
                else:
                    headers['Content-Type'] = 'application/json'
                    response = requests.post(url, json=data, headers=headers, timeout=30)

            print(f"   Status Code: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response keys: {list(response_data.keys()) if isinstance(response_data, dict) else 'Non-dict response'}")
                    return True, response_data
                except:
                    return True, response.text
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_detail = response.json()
                    print(f"   Error: {error_detail}")
                except:
                    print(f"   Error: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def create_sample_pdf_content(self):
        """Create a simple text file to simulate PDF upload"""
        content = self.sample_resume_text.encode('utf-8')
        return io.BytesIO(content)

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        success, response = self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200
        )
        return success

    def test_file_upload_text(self):
        """Test file upload with text file (simulating resume)"""
        # Create a simple text file to test upload
        file_content = self.sample_resume_text.encode('utf-8')
        files = {
            'file': ('sample_resume.txt', io.BytesIO(file_content), 'text/plain')
        }
        
        success, response = self.run_test(
            "File Upload (Text)",
            "POST",
            "upload-resume",
            400,  # Should fail for unsupported format
            files=files
        )
        return success

    def test_analysis_endpoint(self):
        """Test the analysis endpoint with sample data"""
        data = {
            "resume_text": self.sample_resume_text,
            "job_description": self.sample_job_description
        }
        
        success, response = self.run_test(
            "Resume Analysis",
            "POST",
            "analyze",
            200,
            data=data
        )
        
        if success and isinstance(response, dict):
            # Verify response structure
            required_fields = ['id', 'match_percentage', 'matched_skills', 'missing_skills', 'recommendations', 'analysis_summary']
            missing_fields = [field for field in required_fields if field not in response]
            
            if missing_fields:
                print(f"   ⚠️  Missing fields in response: {missing_fields}")
                return False
            else:
                print(f"   ✅ All required fields present")
                print(f"   Match Percentage: {response.get('match_percentage', 'N/A')}%")
                print(f"   Matched Skills: {len(response.get('matched_skills', []))} skills")
                print(f"   Missing Skills: {len(response.get('missing_skills', []))} skills")
                print(f"   Recommendations: {len(response.get('recommendations', []))} items")
                return True
        
        return success

    def test_analysis_history(self):
        """Test the analysis history endpoint"""
        success, response = self.run_test(
            "Analysis History",
            "GET",
            "analysis-history",
            200
        )
        
        if success and isinstance(response, list):
            print(f"   ✅ History contains {len(response)} analyses")
            if len(response) > 0:
                print(f"   Sample analysis ID: {response[0].get('id', 'N/A')}")
        
        return success

    def test_invalid_analysis_data(self):
        """Test analysis with invalid/empty data"""
        data = {
            "resume_text": "",
            "job_description": ""
        }
        
        success, response = self.run_test(
            "Invalid Analysis Data",
            "POST",
            "analyze",
            400,  # Should return error for empty data
            data=data
        )
        return success

    def test_missing_analysis_fields(self):
        """Test analysis with missing required fields"""
        data = {
            "resume_text": self.sample_resume_text
            # Missing job_description
        }
        
        success, response = self.run_test(
            "Missing Analysis Fields",
            "POST",
            "analyze",
            422,  # Validation error
            data=data
        )
        return success

def main():
    print("🚀 Starting AI Resume Matcher API Tests")
    print("=" * 50)
    
    # Setup
    tester = ResumeMatcherAPITester()
    
    # Run all tests
    tests = [
        tester.test_root_endpoint,
        tester.test_file_upload_text,
        tester.test_analysis_endpoint,
        tester.test_analysis_history,
        tester.test_invalid_analysis_data,
        tester.test_missing_analysis_fields,
    ]
    
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
            tester.tests_run += 1
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())