#!/usr/bin/env python3
"""
Test module for the main application.

Project ID: 1cf7de89b0544ae684c202a667dd16f8
"""

import unittest
import sys
import os
from unittest.mock import patch
from io import StringIO

# Add src directory to path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))

from main import main, greet


class TestMain(unittest.TestCase):
    """
    Test cases for the main module.
    """

    def test_greet_with_name(self):
        """Test greeting with a specific name."""
        result = greet("Alice")
        self.assertEqual(result, "Hello, Alice!")

    def test_greet_without_name(self):
        """Test greeting without a name."""
        result = greet()
        self.assertEqual(result, "Hello, World!")

    def test_greet_with_none(self):
        """Test greeting with None as name."""
        result = greet(None)
        self.assertEqual(result, "Hello, World!")

    @patch('sys.stdout', new_callable=StringIO)
    def test_main_function(self, mock_stdout):
        """Test the main function output."""
        result = main()
        output = mock_stdout.getvalue()
        
        self.assertEqual(result, 0)
        self.assertIn("Hello, World!", output)
        self.assertIn("Welcome to the Python project!", output)


if __name__ == '__main__':
    unittest.main()
