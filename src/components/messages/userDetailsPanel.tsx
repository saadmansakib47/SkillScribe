"use client";

import { motion } from "framer-motion";
import { User, Shield, Flag, FileText, Mail, Phone, MapPin, Calendar } from "lucide-react";

interface Props {
  name: string;
  avatar: string;
  role: string;
  onBlockUser: () => void;
  onReportUser: () => void;
  isBlocked?: boolean;
}

export default function UserDetailsPanel({ name, avatar, role, onBlockUser, onReportUser, isBlocked }: Props) {
  const sharedFiles: any[] = [];

  const userInfo = [
    { icon: Mail, label: "Email", value: "student@example.com" },
    { icon: Phone, label: "Phone", value: "+1 234 567 8900" },
    { icon: MapPin, label: "Location", value: "New York, USA" },
    { icon: Calendar, label: "Joined", value: "Jan 2024" },
  ];

  return (
    <div className="w-80 border-l bg-white flex flex-col h-screen overflow-y-auto">
      {/* User Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border-b bg-gradient-to-br from-blue-50 to-white"
      >
        <div className="flex flex-col items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative mb-4"
          >
            <img
              src={avatar}
              alt={name}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <span className={`absolute bottom-1 right-1 w-5 h-5 ${isBlocked ? 'bg-red-500' : 'bg-green-500'} border-3 border-white rounded-full`}></span>
          </motion.div>

          <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            <User className="w-3.5 h-3.5" />
            {role}
          </span>
          {isBlocked && (
            <span className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
              <Shield className="w-3 h-3" />
              Blocked
            </span>
          )}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="p-4 space-y-2 border-b">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          <User className="w-4 h-4" />
          View Profile
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBlockUser}
          disabled={isBlocked}
          className={`w-full py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${isBlocked
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-red-50 text-red-600 hover:bg-red-100'
            }`}
        >
          <Shield className="w-4 h-4" />
          {isBlocked ? 'User Blocked' : 'Block User'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReportUser}
          className="w-full py-2.5 rounded-lg bg-orange-50 text-orange-600 font-medium hover:bg-orange-100 transition-colors flex items-center justify-center gap-2"
        >
          <Flag className="w-4 h-4" />
          Report
        </motion.button>
      </div>

      {/* User Information */}
      <div className="p-4 border-b">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <User className="w-4 h-4" />
          Contact Information
        </h4>
        <div className="space-y-3">
          {userInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 text-sm"
            >
              <info.icon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-500 text-xs">{info.label}</p>
                <p className="text-gray-800 font-medium">{info.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Shared Files */}
      <div className="p-4 flex-1">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Shared Files
        </h4>

        {sharedFiles.length > 0 ? (
          <div className="space-y-2">
            {sharedFiles.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {file.size} • {file.date}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-8 text-gray-400"
          >
            <FileText className="w-12 h-12 mb-2 opacity-50" />
            <p className="text-sm text-center">No files shared yet</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}