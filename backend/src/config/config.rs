use chrono::Local;
use fern::Dispatch;

pub fn setup_logger() -> Result<(), fern::InitError> {
    Dispatch::new()
        .format(|out, message, record| {
            out.finish(format_args!(
                "{} [{}] {}",
                Local::now().format("%Y-%m-%d %H:%M:%S"),
                record.level(),
                message
            ))
        })
        .level(log::LevelFilter::Debug)
        .level_for("actix_web::middleware::logger", log::LevelFilter::Warn)
        .chain(std::io::stdout()) // log to terminal
        .chain(fern::log_file("app.log")?) // log to file in root
        .apply()?;
    Ok(())
}