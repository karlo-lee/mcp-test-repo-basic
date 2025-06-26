#!/usr/bin/env python3
"""
Test module for main.py
Project ID: 2d32029a472e49b3b6b20f3648bd0cf7
"""

import unittest
import sys
import os

# Add src directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))

from main import main

class TestMain(unittest.TestCase):
    """Test cases for main module."""
    
    def test_main_function_exists(self):
        """Test that main function exists and is callable."""
        self.assertTrue(callable(main))
    
    def test_main_function_runs(self):
        """Test that main function runs without errors."""
        try:
            main()
        except Exception as e:
            self.fail(f"main() raised {type(e).__name__} unexpectedly!")

if __name__ == '__main__':
    unittest.main()
