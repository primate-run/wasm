use std::ffi::CString;
use std::os::raw::c_char;

static HELLO: &'static str = "get route!";

#[no_mangle]
pub fn get() -> *mut c_char {
    let s = CString::new(HELLO).unwrap();
    s.into_raw()
}

#[no_mangle]
pub fn get_len() -> usize {
    HELLO.len()
}

fn main() {}
