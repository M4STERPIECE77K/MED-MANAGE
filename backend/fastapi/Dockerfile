FROM python:3.11-alpine AS builder
RUN apk add --no-cache \
    gcc \
    musl-dev \
    postgresql-dev \
    python3-dev

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt
FROM python:3.11-alpine
RUN apk add --no-cache \
    postgresql-libs

WORKDIR /app
COPY --from=builder /install /usr/local
COPY . .
ENV PYTHONPATH=/app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]