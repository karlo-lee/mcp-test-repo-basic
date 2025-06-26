#!/usr/bin/env python3
"""
Test module for the main application.

This module contains unit tests for the main application functionality.
Project ID: b38a645322dc4c65b2f842336141705e
"""

import unittest
import sys
import os
from unittest.mock import patch, MagicMock
from io import StringIO

# Add the src directory to the path so we can import our modules
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))

from main import Application, main


class TestApplication(unittest.TestCase):
    """
    Test cases for the Application class.
    """
    
    def setUp(self) -> None:
        """
        Set up test fixtures before each test method.
        """
        self.app = Application()
    
    def test_application_initialization(self) -> None:
        """
        Test that the Application class initializes correctly.
        """
        self.assertEqual(self.app.name, "Python Project")
        self.assertEqual(self.app.version, "1.0.0")
    
    @patch('sys.stdout', new_callable=StringIO)
    def test_application_run(self, mock_stdout) -> None:
        """
        Test that the application runs and produces expected output.
        """
        self.app.run()
        output = mock_stdout.getvalue()
        
        self.assertIn("Running Python Project v1.0.0", output)
        self.assertIn("Processing data...", output)
        self.assertIn("Data processing completed.", output)
    
    @patch('sys.stdout', new_callable=StringIO)
    def test_process_data(self, mock_stdout) -> None:
        """
        Test the process_data method.
        """
        self.app.process_data()
        output = mock_stdout.getvalue()
        
        self.assertIn("Processing data...", output)
        self.assertIn("Data processing completed.", output)


class TestMainFunction(unittest.TestCase):
    """
    Test cases for the main function.
    """
    
    @patch('sys.stdout', new_callable=StringIO)
    def test_main_function(self, mock_stdout) -> None:
        """
        Test that the main function executes without errors.
        """
        main()
        output = mock_stdout.getvalue()
        
        self.assertIn("Hello, World!", output)
        self.assertIn("Welcome to the Python project!", output)
        self.assertIn("Running Python Project v1.0.0", output)


if __name__ == '__main__':
    # Run the tests
    unittest.main(verbosity=2)
