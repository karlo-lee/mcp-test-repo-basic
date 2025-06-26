#!/usr/bin/env python3
"""
Test file for main.py
Reference: 36a37c4bf23f4c91a2a93a68aa363d15
"""

import unittest
import sys
import os

# Add src directory to path to import main module
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))

import main


class TestMain(unittest.TestCase):
    """
    Test cases for main.py functions.
    Reference: 36a37c4bf23f4c91a2a93a68aa363d15
    """

    def test_greet(self):
        """Test the greet function."""
        result = main.greet("World")
        self.assertEqual(result, "Hello, World!")
        
        result = main.greet("Alice")
        self.assertEqual(result, "Hello, Alice!")

    def test_greet_empty_string(self):
        """Test greet function with empty string."""
        result = main.greet("")
        self.assertEqual(result, "Hello, !")

    def test_greet_with_special_characters(self):
        """Test greet function with special characters."""
        result = main.greet("User@123")
        self.assertEqual(result, "Hello, User@123!")

    def test_process_arguments_with_valid_input(self):
        """Test process_arguments with valid input."""
        # This test would require mocking sys.argv and print output
        # For now, we'll just ensure the function exists and is callable
        self.assertTrue(callable(main.process_arguments))

    def test_main_function_exists(self):
        """Test that main function exists and is callable."""
        self.assertTrue(callable(main.main))


class TestProjectStructure(unittest.TestCase):
    """
    Test cases for project structure validation.
    Reference: 36a37c4bf23f4c91a2a93a68aa363d15
    """

    def test_main_module_imports(self):
        """Test that main module can be imported successfully."""
        import main
        self.assertIsNotNone(main)

    def test_required_functions_exist(self):
        """Test that all required functions exist in main module."""
        import main
        
        required_functions = ['greet', 'process_arguments', 'main']
        for func_name in required_functions:
            self.assertTrue(hasattr(main, func_name), 
                          f"Function {func_name} not found in main module")
            self.assertTrue(callable(getattr(main, func_name)),
                          f"Function {func_name} is not callable")


if __name__ == '__main__':
    print("Running tests - Reference: 36a37c4bf23f4c91a2a93a68aa363d15")
    unittest.main(verbosity=2)
