#!/usr/bin/env python3
"""
Main application module for the Python project.

Project ID: 1cf7de89b0544ae684c202a667dd16f8
"""

import sys
from typing import Optional


def main() -> int:
    """
    Main entry point of the application.
    
    Returns:
        int: Exit code (0 for success, non-zero for error)
    """
    print("Hello, World!")
    print("Welcome to the Python project!")
    return 0


def greet(name: Optional[str] = None) -> str:
    """
    Generate a greeting message.
    
    Args:
        name: Optional name to greet
        
    Returns:
        str: Greeting message
    """
    if name:
        return f"Hello, {name}!"
    return "Hello, World!"


if __name__ == "__main__":
    sys.exit(main())
