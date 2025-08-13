import { createClient } from './supabase/client';

const fallbackContent = {
  hero: [
    {
      id: 1,
      section: "hero",
      type: "text",
      title: "Your Next Step to a Bright Future",
      content: "Unlock global opportunities with expert guidance for studying abroad and test preparation",
      order_index: 1,
      is_active: true,
    },
  ],
  services: [
    {
      id: 2,
      section: "services",
      type: "card",
      title: "Study Abroad Consulting",
      content: "Expert guidance for university selection, application process, and visa assistance",
      order_index: 1,
      is_active: true,
    },
    {
      id: 3,
      section: "services",
      type: "card",
      title: "Test Preparation",
      content: "Comprehensive coaching for IELTS, TOEFL, GRE, GMAT, and other standardized tests",
      order_index: 2,
      is_active: true,
    },
    {
      id: 4,
      section: "services",
      type: "card",
      title: "Career Counseling",
      content: "Personalized career guidance and mentorship for your academic journey",
      order_index: 3,
      is_active: true,
    },
  ],
  testimonials: [
    {
      id: 5,
      section: "testimonials",
      type: "testimonial",
      title: "Sarah Johnson",
      content:
        "Nexture Education made my dream of studying in Canada a reality. Their guidance was invaluable throughout the entire process.",
      order_index: 1,
      is_active: true,
    },
    {
      id: 6,
      section: "testimonials",
      type: "testimonial",
      title: "Michael Chen",
      content:
        "The GMAT preparation course helped me achieve a score of 750. I couldn't have done it without their expert coaching.",
      order_index: 2,
      is_active: true,
    },
    {
      id: 7,
      section: "testimonials",
      type: "testimonial",
      title: "Priya Patel",
      content: "From application to visa, every step was handled professionally. I'm now pursuing my PhD at Oxford!",
      order_index: 3,
      is_active: true,
    },
  ],
  about: [
    {
      id: 8,
      section: "about",
      type: "text",
      title: "About Us",
      content: "We are dedicated to helping students achieve their global education dreams.",
      order_index: 1,
      is_active: true,
    },
  ],
};

export async function getDynamicContent(section) {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("dynamic_content")
      .select("*")
      .eq("section", section)
      .eq("is_active", true)
      .order("order_index", { ascending: true });

    if (error) {
      // Only log unexpected errors, not missing table errors
      if (!error.message.includes("Could not find the table") && !error.message.includes("schema cache")) {
        console.error("Error fetching dynamic content:", error);
      }
      return fallbackContent[section] || [];
    }

    return data && data.length > 0 ? data : fallbackContent[section] || [];
  } catch (error) {
    if (!error?.message?.includes("Could not find the table") && !error?.message?.includes("schema cache")) {
      console.error("Database connection error:", error);
    }
    return fallbackContent[section] || [];
  }
}

export async function getTestimonials() {
  return getDynamicContent("testimonials");
}

export async function getServices() {
  return getDynamicContent("services");
}

export async function getHeroContent() {
  return getDynamicContent("hero");
}

export async function getAboutContent() {
  return getDynamicContent("about");
}
