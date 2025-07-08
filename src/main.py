#!/usr/bin/env python3
"""
Main application module for the Python project.

Project ID: 0c49132442224fd197c1742768d7a61e
"""

import sys
from typing import Optional


class Application:
    """Main application class."""
    
    def __init__(self, name: str = "MyApp"):
        self.name = name
        self.version = "1.0.0"
    
    def run(self, args: Optional[list] = None) -> int:
        """Run the application.
        
        Args:
            args: Command line arguments
            
        Returns:
            Exit code (0 for success)
        """
        print(f"Starting {self.name} v{self.version}")
        
        if args:
            print(f"Arguments: {args}")
        
        # Main application logic goes here
        print("Application running successfully!")
        
        return 0
    
    def get_info(self) -> dict:
        """Get application information."""
        return {
            "name": self.name,
            "version": self.version,
            "status": "running"
        }


def main() -> int:
    """Main entry point."""
    app = Application()
    return app.run(sys.argv[1:])


if __name__ == "__main__":
    sys.exit(main())
