"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackages } from "@/store/features/packageSlice";
import type { RootState, AppDispatch } from "@/store/store";
import { Spin, Empty } from "antd";
import PackageCard from "./PackageCard";
import styles from "./package.module.scss";

export default function Package() {
  const dispatch = useDispatch<AppDispatch>();
  const packages = useSelector((state: RootState) => state.packages.packages);
  const loading = useSelector((state: RootState) => state.packages.loading);
  const error = useSelector((state: RootState) => state.packages.error);

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  if (loading) return <div className={styles.pkgCenter}><Spin size="large" /></div>;
  if (error) return <div className={styles.pkgCenter}>{error}</div>;
  if (!packages.length) return <div className={styles.pkgCenter}><Empty /></div>;

  return (
    <div className={styles.packageGrid}>
      {packages.map((pkg) => (
        <PackageCard key={(pkg as any)._id ?? pkg.slug} pkg={pkg} />
      ))}
    </div>
  );
}
