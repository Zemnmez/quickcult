load("@rules_python//python:defs.bzl", "py_binary")

py_binary(
  name = "main",
  srcs = ["main.py"],
  deps = [ requirement("z3-solver"), "//gen:core_py" ],
  data = [ "//gen:core_en.json" ]
)
