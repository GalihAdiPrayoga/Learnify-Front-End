import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Button from "@/components/button";

const MaterialNavigator = ({ prevMaterial, nextMaterial, onNavigate }) => {
  return (
    <div className="mt-10 flex justify-between border-t pt-6">
      {prevMaterial ? (
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="rounded"
        >
          <Button
            onClick={() => onNavigate(prevMaterial.id)}
            variant="primary"
            className="flex items-center gap-2 px-4 py-2"
          >
            <ArrowLeft size={16} />
            Materi Sebelumnya
          </Button>
        </motion.div>
      ) : (
        <div />
      )}

      {nextMaterial ? (
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="rounded"
        >
          <Button
            onClick={() => onNavigate(nextMaterial.id)}
            variant="primary"
            className="flex items-center gap-2 px-4 py-2"
          >
            Materi Selanjutnya
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default MaterialNavigator;
