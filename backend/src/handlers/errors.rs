pub mod handler_errors {
    use std::fmt::{Display, Formatter, Result};

    #[derive(Debug)]
    pub enum PayloadError {
        JsonParseError(String),
        MissingFieldError(String),
    }

    impl Display for PayloadError {
        fn fmt(&self, f: &mut Formatter) -> Result {
            match self {
                PayloadError::JsonParseError(msg) => write!(f, "JSON Parse Error: {}", msg),
                PayloadError::MissingFieldError(msg) => {
                    write!(f, "Missing Field Error: {}", msg)
                }
            }
        }
    }

    impl std::error::Error for PayloadError {}
}
