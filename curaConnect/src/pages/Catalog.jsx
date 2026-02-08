import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Footer from "../components/core/HomePage/common/Footer";
import HealthProgram_Card from "../components/core/Catalog/HealthProgram_Card";
import HealthProgramSlider from "../components/core/Catalog/HealthProgramSlider";

import { apiConnector } from "../services/apiconnector";
import { categoryEndpoints, catalogEndpoints } from "../services/apis";
import Loader from "../components/core/HomePage/common/Loader";

function Catalog() {
  const { catalogName } = useParams();

  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH CATEGORY ================= */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiConnector(
          "GET",
          categoryEndpoints.GET_ALL_CATEGORIES_API,
        );

        if (!response?.data?.success) return;

        const formattedCatalogName = catalogName?.toLowerCase();

        const category = response?.data?.data?.find((ct) => {
          const dbSlug = ct.name?.toLowerCase().replace(/\s+/g, "-");
          return dbSlug === formattedCatalogName;
        });

        if (category) setCategoryId(category._id);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [catalogName]);

  /* ================= FETCH CATALOG DATA ================= */
  useEffect(() => {
    const fetchCatalogDetails = async () => {
      if (!categoryId) return;

      setLoading(true);

      try {
        const response = await apiConnector(
          "POST",
          catalogEndpoints.GET_CATALOG_PAGE_DATA_API,
          { categoryId },
        );

        if (!response?.data?.success) return;

        setCatalogPageData(response?.data?.data);
      } catch (error) {
        console.log("Error fetching catalog page data:", error);
      }

      setLoading(false);
    };

    fetchCatalogDetails();
  }, [categoryId]);

  if (loading || !catalogPageData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="text-white">
      {/* ================= HERO SECTION (GLASS) ================= */}
      <div className="relative py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 md:p-10 shadow-xl">
            {/* Breadcrumb */}
            <p className="text-sm text-richblack-400 tracking-wide mb-4">
              Home / Catalog /
              <span className="text-yellow-50 font-medium ml-1">
                {catalogPageData?.selectedCategory?.name}
              </span>
            </p>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              {catalogPageData?.selectedCategory?.name}
            </h1>

            {/* Description */}
            <p className="text-richblack-300 max-w-2xl leading-relaxed text-base">
              {catalogPageData?.selectedCategory?.description}
            </p>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">
        {/* SECTION 1 */}
        <section>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 mb-8 shadow-md">
            <h2 className="text-xl md:text-2xl font-semibold tracking-wide border-l-4 border-yellow-50 pl-4">
              Health Programs to get you started
            </h2>
          </div>

          <HealthProgramSlider
            HealthPrograms={
              catalogPageData?.selectedCategory?.healthPrograms || []
            }
          />
        </section>

        {/* SECTION 2 */}
        <section>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 mb-8 shadow-md">
            <h2 className="text-xl md:text-2xl font-semibold tracking-wide border-l-4 border-yellow-50 pl-4">
              Top Health Programs in {catalogPageData?.selectedCategory?.name}
            </h2>
          </div>

          <HealthProgramSlider
            HealthPrograms={
              catalogPageData?.differentCategory?.healthPrograms || []
            }
          />
        </section>

        {/* SECTION 3 */}
        <section>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 mb-10 shadow-md">
            <h2 className="text-xl md:text-2xl font-semibold tracking-wide border-l-4 border-yellow-50 pl-4">
              Frequently Enrolled
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {catalogPageData?.mostEnrolledHealthPrograms
              ?.slice(0, 6)
              .map((healthProgram, index) => (
                <HealthProgram_Card key={index} healthProgram={healthProgram} />
              ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default Catalog;
