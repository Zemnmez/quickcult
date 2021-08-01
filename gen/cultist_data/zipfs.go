package main

import (
	"archive/zip"
	"io"
	"io/fs"
)

func ZipFs(w io.Writer, fs fs.FS) (err error) {
	z := zip.NewWriter(w)

	defer z.Close()

	return fs.WalkDir(fs, ".", func(path string, d fs.DirEntry, err error) error {
		if fs.IsDir() {
			return nil
		}
		dst, err := z.Create(path)
		if err != nil {
			return err
		}

		src, err := fs.Open(path)
		if err != nil {
			return err
		}
		defer src.Close()

		_, err = io.Copy(dst, src)
		if err != nil {
			return nil
		}

	})
}
