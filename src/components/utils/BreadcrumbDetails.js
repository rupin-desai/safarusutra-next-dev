/**
 * Breadcrumb navigation utility functions
 */

// Map of route paths to their display names
const routeLabels = {
  "": "Home",
  tour: "Tours",
  blog: "Blog",
  about: "About Us",
  contact: "Contact",
  destinations: "Destinations",
  destination: "Destinations",
  gallery: "Gallery",
  faq: "FAQ",
  privacy: "Privacy Policy",
  terms: "Terms & Conditions",
  // friendly default label for fixed departures
  fixeddepartures: "Fixed Departures",
};

// Special route handlers for dynamic routes (like tour/123)
const specialRouteHandlers = {
  // For tour details pages
  tour: (segments, index) => {
    // If this is a tour ID (next segment after 'tour')
    if (index === 1 && segments[0] === "tour") {
      const tourId = segments[index];
      return {
        label: `Tour Details`,
        path: `/tour/${tourId}`,
        isLast: true,
      };
    }
    return null;
  },

  // Creative fixeddepartures breadcrumb handler
  fixeddepartures: (segments, index) => {
    // Listing page ( /fixeddepartures )
    if (index === 0 && segments[0] === "fixeddepartures") {
      return {
        // creative message for listing
        label: "Fixed Departures",
        path: "/fixeddepartures",
        isLast: segments.length === 1,
      };
    }

    // If a numeric id follows (e.g. /fixeddepartures/123)
    if (
      index === 1 &&
      segments[0] === "fixeddepartures" &&
      isNumericId(segments[1])
    ) {
      const depId = segments[1];
      return {
        label: `Departure #${depId}`,
        path: `/fixeddepartures/${depId}`,
        isLast: segments.length === 2,
      };
    }

    // If slug present (e.g. /fixeddepartures/123/some-slug)
    if (index === 2 && segments[0] === "fixeddepartures") {
      const slug = segments[2]
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      return {
        label: slug || "Departure Details",
        path: `/fixeddepartures/${segments[1]}/${segments[2]}`,
        isLast: true,
      };
    }

    return null;
  },

  // For blog post pages
  blog: (segments, index) => {
    // If this is a blog slug (next segment after 'blog')
    if (index === 1 && segments[0] === "blog") {
      const blogSlug = segments[index];
      return {
        label: `Article`,
        path: `/blog/${blogSlug}`,
        isLast: true,
      };
    }
    return null;
  },

  // For destination pages with numeric IDs
  destination: (segments, index) => {
    // If this is a destination ID (numeric segment after 'destination')
    if (index === 1 && segments[0] === "destination") {
      // Check if there's a name segment after the ID
      if (segments.length > 2) {
        const destinationId = segments[index];
        const destinationName = segments[index + 1]
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        return {
          label: destinationName,
          path: `/destination/${destinationId}/${segments[index + 1]}`,
          isLast: true,
          skipNext: true, // Signal to skip the next segment
        };
      }
    }
    return null;
  },
};

/**
 * Check if a string is a numeric ID
 * @param {string} segment - URL path segment
 * @returns {boolean} True if segment is a numeric ID
 */
const isNumericId = (segment) => {
  return /^\d+$/.test(segment);
};

/**
 * Generate breadcrumbs from the current path
 * @param {string} path - Current URL path
 * @returns {Array} Array of breadcrumb objects with label and path
 */
export const generateBreadcrumbs = (path) => {
  // Remove leading slash and trailing slash if present
  const cleanPath = path.replace(/^\/|\/$/g, "");

  // If path is empty (home page), return empty breadcrumbs array
  if (!cleanPath) return [];

  // Split path into segments
  const segments = cleanPath.split("/");
  const breadcrumbs = [];

  // Build up breadcrumb trail
  let currentPath = "";
  let skipNext = false;

  segments.forEach((segment, index) => {
    // Skip this segment if flagged by a special handler
    if (skipNext) {
      skipNext = false;
      return;
    }

    // Skip numeric segments (IDs) that follow a named route
    if (index > 0 && isNumericId(segment)) {
      currentPath += `/${segment}`; // Still include in path but don't create breadcrumb
      return;
    }

    currentPath += `/${segment}`;

    // Check if there's a special handler for this route type
    const specialHandler = specialRouteHandlers[segment];
    if (specialHandler) {
      const special = specialHandler(segments, index);
      if (special) {
        breadcrumbs.push(special);
        if (special.skipNext) {
          skipNext = true;
        }
        return;
      }
    }

    // Use predefined label if available, otherwise capitalize the segment
    const label =
      routeLabels[segment] ||
      segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    // Don't create link for the last item
    const isLast = index === segments.length - 1;

    breadcrumbs.push({
      label,
      path: isLast ? null : currentPath,
      isLast,
    });
  });

  return breadcrumbs;
};

/**
 * Get formatted breadcrumbs for a specific route
 * @param {string} path - Current URL path
 * @returns {Array} Formatted breadcrumbs for HeroSection
 */
export const getBreadcrumbs = (path) => {
  return generateBreadcrumbs(path);
};

export default getBreadcrumbs;
