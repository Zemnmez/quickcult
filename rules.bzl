load("//tools/jest:jest.bzl",  _jest_test = "jest_test")
load("@npm//@bazel/typescript:index.bzl", _ts_project = "ts_project")
load("@npm//prettier:index.bzl", _prettier_test = "prettier_test", _prettier = "prettier")

def jest_test(**kwargs):
    _jest_test(**kwargs)

def ts_project(name, deps = [], srcs = [], **kwargs):
    _ts_project(
        name = name,
        tsc = "@npm//ttypescript/bin:ttsc",
        deps = deps + ["@npm//typescript-transform-paths"],
        **kwargs,
    )
"""
    prettier_test(
            name = name + "_prettier",
            data = srcs,
            args = srcs
    )
"""


def prettier(data = [], args = [], **kwargs):
        _prettier(
            data = data + [ "//:.prettierrc.json", "//:.gitignore" ],
            args = args + ["--config", "$(location //:.prettierrc.json)", "--ignore-path", "$(location //:.gitignore)"]
        )

def prettier_test(name = None, data = [], args = [], **kwargs):
    _prettier_test(
            name = name,
            data = data + [ "//:.prettierrc.json", "//:.gitignore" ],
            args = args + ["--config", "$(location //:.prettierrc.json)", "--ignore-path", "$(location //:.gitignore)"]
    )
