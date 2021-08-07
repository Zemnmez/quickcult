import unittest
#from gen import core_pb2 as core
<<<<<<< HEAD
import gen.core


class TestBasic(unittest.TestCase):
    def parse_core_smoke(self):
        gen.core.load()
=======
from gen.core_pb2 import Core
from google.protobuf import json_format


class TestBasic(unittest.TestCase):
    def test_parse_core(self):
        data = None
        with open('gen/core_en.json', 'r') as corejson:
            data = json_format.Parse(corejson.read(), Core())
        self.assertNotEqual(data, None)
>>>>>>> 7b0e85651a1e0ac661eee4ffa2fa871f342d54ff

if __name__ == '__main__':
    unittest.main()