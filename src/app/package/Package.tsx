"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackages } from "@/store/features/packageSlice";
import type { RootState, AppDispatch } from "@/store/store";
import { Spin, Empty, Select, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PackageCard from "./PackageCard";
import styles from "./package.module.scss";

const { Option } = Select;

export default function Package() {
  const dispatch = useDispatch<AppDispatch>();
  const { packages, loading, error } = useSelector(
    (state: RootState) => state.packages
  );

  const [filteredPackages, setFilteredPackages] = useState(packages);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [priceFilter, setPriceFilter] = useState("all");

  useEffect(() => {
    if (!packages.length) {
      dispatch(fetchPackages());
    }
  }, [dispatch, packages.length]);

  useEffect(() => {
    let result = [...packages];

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (pkg) =>
          pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pkg.destinations.some((dest) =>
            dest.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Price filter
    if (priceFilter !== "all") {
      switch (priceFilter) {
        case "budget":
          result = result.filter((pkg) => pkg.price < 20000);
          break;
        case "mid":
          result = result.filter((pkg) => pkg.price >= 20000 && pkg.price < 40000);
          break;
        case "premium":
          result = result.filter((pkg) => pkg.price >= 40000);
          break;
      }
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "duration-short":
        result.sort((a, b) => a.duration.days - b.duration.days);
        break;
      case "duration-long":
        result.sort((a, b) => b.duration.days - a.duration.days);
        break;
      default:
        break;
    }

    setFilteredPackages(result);
  }, [packages, searchTerm, sortBy, priceFilter]);
console.log("packages data in package component",packages);
  if (loading) {
    return (
      <div className={styles.pkgCenter}>
        <Spin size="large" tip="Loading amazing packages..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.pkgCenter}>
        <div style={{ textAlign: "center", color: "#ff6b35" }}>
          <h3>⚠️ {error}</h3>
          <p>Please try again later</p>
        </div>
      </div>
    );
  }

  if (!packages.length) {
    return (
      <div className={styles.pkgCenter}>
        <Empty description="No packages available at the moment" />
      </div>
    );
  }

  return (
    <div className={styles.packagesWrapper}>
      {/* Filters Bar */}
      <div className={styles.filtersBar}>
        <div className={styles.searchBox}>
          <Input
            size="large"
            placeholder="Search packages, destinations..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
          />
        </div>

        <div className={styles.filterControls}>
          <Select
            size="large"
            value={priceFilter}
            onChange={setPriceFilter}
            style={{ width: 180 }}
          >
            <Option value="all">All Prices</Option>
            <Option value="budget">Budget ({"<"}20k)</Option>
            <Option value="mid">Mid-Range (20-40k)</Option>
            <Option value="premium">Premium ({">"}40k)</Option>
          </Select>

          <Select
            size="large"
            value={sortBy}
            onChange={setSortBy}
            style={{ width: 200 }}
          >
            <Option value="default">Sort By: Default</Option>
            <Option value="price-low">Price: Low to High</Option>
            <Option value="price-high">Price: High to Low</Option>
            <Option value="duration-short">Duration: Short First</Option>
            <Option value="duration-long">Duration: Long First</Option>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className={styles.resultsCount}>
        <p>
          Showing <strong>{filteredPackages.length}</strong> package
          {filteredPackages.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Package Grid */}
      {filteredPackages.length > 0 ? (
        <div className={styles.packageGrid}>
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      ) : (
        <div className={styles.pkgCenter} style={{ minHeight: "300px" }}>
          <Empty description="No packages match your filters" />
        </div>
      )}
    </div>
  );
}
