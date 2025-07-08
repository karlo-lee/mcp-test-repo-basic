#!/usr/bin/env python3
"""
Test module for the main application.

Project ID: 0c49132442224fd197c1742768d7a61e
"""

import unittest
import sys
import os

# Add src directory to path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))

from main import Application, main


class TestApplication(unittest.TestCase):
    """Test cases for the Application class."""
    
    def setUp(self):
        """Set up test fixtures before each test method."""
        self.app = Application("TestApp")
    
    def test_init(self):
        """Test application initialization."""
        self.assertEqual(self.app.name, "TestApp")
        self.assertEqual(self.app.version, "1.0.0")
    
    def test_init_default_name(self):
        """Test application initialization with default name."""
        default_app = Application()
        self.assertEqual(default_app.name, "MyApp")
    
    def test_run_without_args(self):
        """Test running application without arguments."""
        result = self.app.run()
        self.assertEqual(result, 0)
    
    def test_run_with_args(self):
        """Test running application with arguments."""
        result = self.app.run(["--test", "value"])
        self.assertEqual(result, 0)
    
    def test_get_info(self):
        """Test getting application information."""
        info = self.app.get_info()
        expected = {
            "name": "TestApp",
            "version": "1.0.0",
            "status": "running"
        }
        self.assertEqual(info, expected)


class TestMainFunction(unittest.TestCase):
    """Test cases for the main function."""
    
    def test_main_function_exists(self):
        """Test that main function exists and is callable."""
        self.assertTrue(callable(main))


if __name__ == "__main__":
    unittest.main()
