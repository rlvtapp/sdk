<?php

declare(strict_types=1);

namespace Relevate\Sdk\Exceptions;

use RuntimeException;

final class ApiException extends RuntimeException
{
    public function __construct(
        string $message,
        public readonly int $statusCode,
        public readonly string $responseBody = '',
    ) {
        parent::__construct($message, $statusCode);
    }
}
