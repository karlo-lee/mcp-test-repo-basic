#!/usr/bin/env python3
"""
Test module for the main application.

This module contains unit tests for the main.py module.
Project ID: bad3ecc82db3499a97f325b7ff1b9f3c
"""

import unittest
import sys
import os
from unittest.mock import patch
from io import StringIO

# Add the src directory to the path so we can import main
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))

import main


class TestMain(unittest.TestCase):
    """
    Test cases for the main module.
    """
    
    def test_greet_with_name(self):
        """
        Test the greet function with a name provided.
        """
        result = main.greet("Alice")
        self.assertEqual(result, "Hello, Alice!")
    
    def test_greet_without_name(self):
        """
        Test the greet function without a name (default greeting).
        """
        result = main.greet()
        self.assertEqual(result, "Hello, World!")
    
    def test_greet_with_none(self):
        """
        Test the greet function with None as name.
        """
        result = main.greet(None)
        self.assertEqual(result, "Hello, World!")
    
    @patch('sys.stdout', new_callable=StringIO)
    def test_main_function_output(self, mock_stdout):
        """
        Test that the main function produces expected output.
        """
        result = main.main()
        output = mock_stdout.getvalue()
        
        self.assertEqual(result, 0)
        self.assertIn("Hello, World!", output)
        self.assertIn("Welcome to your new Python project!", output)


class TestIntegration(unittest.TestCase):
    """
    Integration tests for the application.
    """
    
    def test_module_imports(self):
        """
        Test that all required modules can be imported.
        """
        # This test ensures that the main module can be imported without errors
        self.assertTrue(hasattr(main, 'main'))
        self.assertTrue(hasattr(main, 'greet'))
        self.assertTrue(callable(main.main))
        self.assertTrue(callable(main.greet))


if __name__ == '__main__':
    unittest.main()
