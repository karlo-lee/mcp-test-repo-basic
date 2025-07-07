import unittest
import sys

# 742a1271ec7a4c32bdcc44ec58882bca

class TestMain(unittest.TestCase):
    
    def test_hello_world(self):
        """Test that main returns hello world"""
        self.assertEqual(sys.stdout.read(), "Hello, World!\n")

if __name__ == "__main__":
    unittest.main()