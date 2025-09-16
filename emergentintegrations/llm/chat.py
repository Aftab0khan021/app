from typing import Any, Dict, List, Union

class UserMessage:
    """Minimal stub message type compatible with your import."""
    def __init__(self, content: str):
        self.role = "user"
        self.content = content

    def dict(self) -> Dict[str, str]:
        return {"role": self.role, "content": self.content}

class LlmChat:
    """Minimal stub LLM chat client. Replace with real implementation later."""
    def __init__(self, model: str | None = None, **kwargs: Any) -> None:
        self.model = model or "stub-model"

    def chat(self, messages: List[Union[str, Dict[str, Any], UserMessage]]) -> str:
        """Return an echo-style response so downstream code keeps working."""
        if not messages:
            return "[stub] (no input)"
        last = messages[-1]
        if isinstance(last, UserMessage):
            text = last.content
        elif isinstance(last, dict):
            text = str(last.get("content", ""))
        else:
            text = str(last)
        return f"[stub:{self.model}] You said: {text}"
