extern fn respond_string(pointer: [*]const u8, length: u32) void;
extern fn view(pointer: [*]const u8, length: u32) void;

pub export fn get() void {
    const response : []const u8 = "Hi!";
    respond_string(response.ptr, response.len);
}
