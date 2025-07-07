#!/usr/bin/env python3
"""
Main application module for the Python project.

This is the entry point for the application.
Project ID: bad3ecc82db3499a97f325b7ff1b9f3c
"""

import sys
from typing import Optional


def main() -> int:
    """
    Main function that serves as the entry point for the application.
    
    Returns:
        int: Exit code (0 for success, non-zero for error)
    """
    print("Hello, World!")
    print("Welcome to your new Python project!")
    return 0


def greet(name: Optional[str] = None) -> str:
    """
    Generate a greeting message.
    
    Args:
        name: Optional name to greet. If None, uses a default greeting.
        
    Returns:
        str: Greeting message
    """
    if name:
        return f"Hello, {name}!"
    return "Hello, World!"


if __name__ == "__main__":
    sys.exit(main())
