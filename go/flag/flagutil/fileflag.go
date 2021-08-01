package flagutil

import (
	"io"
	"os"
	"strings"
)

type nopWriter struct {
	io.Writer
}

func (n nopWriter) Close() (err error) { return nil }

type FileFlagWC struct {
	io.WriteCloser
	Flag string
}

func (f FileFlagWC) String() string {
	return f.Flag
}

func (f *FileFlagWC) Set(s string) (err error) {
	if strings.TrimSpace(s) == "-" {
		f.WriteCloser = nopWriter{os.Stdout}
		return
	}

	f.WriteCloser, err = os.Open(s)
	return
}

func (f *FileFlagWC) Close() (err error) {
	if f.WriteCloser != nil {
		err = f.WriteCloser.Close()
	}

	return
}
