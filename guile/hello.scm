(import (scheme base)
        (scheme write)
        (hoot compile)
        (wasm assemble))

(with-output-to-file "hello.wasm"
  (lambda ()
    (write-bytevector
     (assemble-wasm
      (compile '(begin
                  (define (hello-world request)
                    "Hello, world!")
                  hello-world))))))
