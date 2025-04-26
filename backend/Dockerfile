FROM rust:1.67
WORKDIR /app
COPY . . 
RUN cargo build --release
EXPOSE 5000

CMD ["./target/release/pump"]
