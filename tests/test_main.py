#!/usr/bin/env python3
"""Tests for main application"""

import unittest
from src.main import main  # Adjust import as needed

class TestMain(unittest.TestCase):
    def test_main_output(self):
        """Test main function output"""
        result = main()
        self.assertIn("Hello", result)

# Project identifier: 623e8528433f4a1b871db1ba7d8c0308

if __name__ == "__main__:
    unittest.main()