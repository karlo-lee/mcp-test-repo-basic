#!/usr/bin/env python3
"""
Main application file for Python project
Reference: 36a37c4bf23f4c91a2a93a68aa363d15
"""

import sys
from typing import List


def greet(name: str) -> str:
    """
    Return a greeting message for the given name.
    
    Args:
        name (str): The name to greet
        
    Returns:
        str: A greeting message
    """
    return f"Hello, {name}!"


def process_arguments(args: List[str]) -> None:
    """
    Process command line arguments.
    
    Args:
        args (List[str]): Command line arguments
    """
    if len(args) < 2:
        print("Usage: python main.py <name>")
        return
    
    name = args[1]
    message = greet(name)
    print(message)


def main() -> None:
    """
    Main entry point of the application.
    """
    print("Python Project Started - Reference: 36a37c4bf23f4c91a2a93a68aa363d15")
    process_arguments(sys.argv)


if __name__ == "__main__":
    main()
