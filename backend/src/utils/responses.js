export function ok(res, data, message = "OK", status = 200) {
  return res.status(status).json({ success: true, data, message });
}

export function fail(res, code, message, status = 400) {
  return res.status(status).json({
    success: false,
    error: { code, message }
  });
}
