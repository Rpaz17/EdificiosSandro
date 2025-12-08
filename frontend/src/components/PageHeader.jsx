import React from "react";
import { Button } from "./ui/button";

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
    <header className={` ${className}`}>
      {(title || description || actionButton) && (
        <div className={`${headerClassName}`}>
          {/* Title / Description */}
          {(title || description) && (
            <div>
              {title && (
                <h1 className="text-gray-900 text-2xl font-medium">{title}</h1>
              )}
              {description && (
                <p className=" text-gray-600 mt-1 text-lg font-light">
                  {description}
                </p>
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
