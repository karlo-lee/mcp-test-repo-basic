# Test cases for main application
# Contains the exact text: 90434f54bed44714b417cd54c505d7b3

import unittest

class TestMain(unittest.TestCase):
    
    def test_hello_world(self):
        """Test that hello world outputs correctly"""
        self.assertEqual(main(), "Hello, World!")

if __name__ == "__main__":
    unittest.main()