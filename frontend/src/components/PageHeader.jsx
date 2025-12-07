import React from "react";
import { Button } from "./button";

/**
 * Header para las pantallas porque todas tienen el mismo header
 *
 * @param {object} props
 * @param {string} props.title - Main title of the page
 * @param {string} [props.description] - Optional description under the title
 * @param {object} [props.actionButton] - Optional action button configuration
 * @param {string} [props.className] - Extra classes for the wrapper
 * @param {string} [props.headerClassName] - Classes for the top section
 */
export function PageHeader({
  title,
  description,
  actionButton,
  className = "",
  headerClassName = "",
}) {
  return (
    <header className={`flex flex-col gap-4 ${className}`}>
      {(title || description || actionButton) && (
        <div
          className={`mb-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between ${headerClassName}`}
        >
          {/* Title / Description */}
          {(title || description) && (
            <div>
              {title && (
                <h1 className="mb-2 text-3xl font-semibold text-slate-900">
                  {title}
                </h1>
              )}
              {description && (
                <p className="text-sm text-slate-500">{description}</p>
              )}
            </div>
          )}

          {/* Action Button */}
          {actionButton && (
            <Button
              variant={actionButton.variant || "default"}
              onClick={actionButton.onClick}
              className="inline-flex items-center gap-2"
            >
              {actionButton.icon}
              {actionButton.label}
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
