fn describe_role(name: &str) -> String {
    format!("{name} supports CLI and validation experiments.")
}

fn main() {
    println!("{}", describe_role("Rust contributor"));
}
