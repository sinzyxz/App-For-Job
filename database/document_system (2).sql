-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 29, 2026 at 05:22 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `document_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `audit_logs`
--

CREATE TABLE `audit_logs` (
  `audit_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `action` varchar(100) DEFAULT NULL,
  `table_name` varchar(100) DEFAULT NULL,
  `record_id` int(11) DEFAULT NULL,
  `detail` text DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `browser` varchar(255) DEFAULT NULL,
  `operating_system` varchar(100) DEFAULT NULL,
  `created_datetime` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `audit_logs`
--

INSERT INTO `audit_logs` (`audit_id`, `user_id`, `action`, `table_name`, `record_id`, `detail`, `ip_address`, `created_at`, `browser`, `operating_system`, `created_datetime`) VALUES
(1, 3, 'CREATE', 'documents', 1, 'Create Document', '127.0.0.1', '2026-07-28 21:40:37', NULL, NULL, '2026-07-29 04:43:21'),
(2, 3, 'UPLOAD', 'document_files', 1, 'Upload purchase.pdf', '127.0.0.1', '2026-07-28 21:40:37', NULL, NULL, '2026-07-29 04:43:21'),
(3, 2, 'APPROVE', 'documents', 1, 'Approve Document', '127.0.0.1', '2026-07-28 21:40:37', NULL, NULL, '2026-07-29 04:43:21'),
(4, 4, 'CREATE', 'documents', 3, 'Create HR Document', '127.0.0.1', '2026-07-28 21:40:37', NULL, NULL, '2026-07-29 04:43:21'),
(5, 2, 'APPROVE', 'documents', 2, 'Approve Document', '127.0.0.1', '2026-07-28 21:40:37', NULL, NULL, '2026-07-29 04:43:21'),
(6, 1, 'CREATE', 'documents', 6, 'Created document IN-2026-000006', NULL, '2026-07-28 22:26:30', NULL, NULL, '2026-07-29 05:26:30'),
(7, 1, 'APPROVE', 'documents', 1, 'Approve Document', NULL, '2026-07-28 22:32:17', NULL, NULL, '2026-07-29 05:32:17'),
(8, 1, 'APPROVE', 'documents', 3, 'Approve Document', NULL, '2026-07-28 22:44:45', NULL, NULL, '2026-07-29 05:44:45'),
(9, 1, 'CREATE', 'documents', 7, 'Created document IN-2026-000007', NULL, '2026-07-28 23:17:16', NULL, NULL, '2026-07-29 06:17:16'),
(10, 2, 'CREATE', 'documents', 8, 'Created document IN-2026-000008', NULL, '2026-07-28 23:19:14', NULL, NULL, '2026-07-29 06:19:14'),
(11, 2, 'CREATE', 'documents', 9, 'Created document OUT-2026-000004', NULL, '2026-07-28 23:20:15', NULL, NULL, '2026-07-29 06:20:15'),
(12, 2, 'CREATE', 'documents', 10, 'Created document OUT-2026-000005', NULL, '2026-07-28 23:20:42', NULL, NULL, '2026-07-29 06:20:42'),
(13, 2, 'UPLOAD', 'document_files', 6, 'Upload file dis.jpg to document ID 10', NULL, '2026-07-28 23:20:42', NULL, NULL, '2026-07-29 06:20:42'),
(14, 2, 'CREATE', 'documents', 11, 'Created document IN-2026-000009', NULL, '2026-07-28 23:55:01', NULL, NULL, '2026-07-29 06:55:01'),
(15, 1, 'CREATE', 'documents', 12, 'Created document IN-2026-000010', NULL, '2026-07-29 00:31:25', NULL, NULL, '2026-07-29 07:31:25'),
(16, 1, 'APPROVE', 'documents', 12, 'Approve Document', NULL, '2026-07-29 00:41:34', NULL, NULL, '2026-07-29 07:41:34'),
(17, 1, 'APPROVE', 'documents', 9, 'Approve Document', NULL, '2026-07-29 00:55:54', NULL, NULL, '2026-07-29 07:55:54'),
(18, 1, 'CREATE', 'documents', 13, 'Created document IN-2026-000011', NULL, '2026-07-29 01:41:27', NULL, NULL, '2026-07-29 08:41:27'),
(19, 1, 'APPROVE', 'documents', 7, 'Approve Document', NULL, '2026-07-29 01:48:32', NULL, NULL, '2026-07-29 08:48:32'),
(20, 1, 'DELETE', 'documents', 7, 'Deleted document IN-2026-000007', NULL, '2026-07-29 01:48:34', NULL, NULL, '2026-07-29 08:48:34'),
(21, 3, 'CREATE', 'documents', 14, 'Created document IN-2026-000012', NULL, '2026-07-29 01:49:09', NULL, NULL, '2026-07-29 08:49:09'),
(22, 2, 'APPROVE', 'documents', 14, 'Approve Document', NULL, '2026-07-29 01:49:31', NULL, NULL, '2026-07-29 08:49:31'),
(23, 1, 'CREATE', 'documents', 15, 'Created document IN-2026-000013', NULL, '2026-07-29 02:00:02', NULL, NULL, '2026-07-29 09:00:02'),
(24, 2, 'CREATE', 'documents', 16, 'Created document IN-2026-000014', NULL, '2026-07-29 02:00:16', NULL, NULL, '2026-07-29 09:00:16'),
(25, 3, 'CREATE', 'documents', 17, 'Created document IN-2026-000015', NULL, '2026-07-29 02:01:23', NULL, NULL, '2026-07-29 09:01:23'),
(26, 1, 'CREATE', 'documents', 18, 'Created document IN-2026-000016', NULL, '2026-07-29 02:07:30', NULL, NULL, '2026-07-29 09:07:30'),
(27, 3, 'CREATE', 'documents', 19, 'Created document IN-2026-000017', NULL, '2026-07-29 02:18:19', NULL, NULL, '2026-07-29 09:18:19'),
(28, 3, 'CREATE', 'documents', 20, 'Created document IN-2026-000018', NULL, '2026-07-29 02:19:56', NULL, NULL, '2026-07-29 09:19:56'),
(29, 3, 'CREATE', 'documents', 21, 'Created document IN-2026-000019', NULL, '2026-07-29 02:20:17', NULL, NULL, '2026-07-29 09:20:17'),
(30, 3, 'CREATE', 'documents', 22, 'Created document IN-2026-000020', NULL, '2026-07-29 02:21:19', NULL, NULL, '2026-07-29 09:21:19'),
(31, 3, 'CREATE', 'documents', 23, 'Created document OUT-2026-000006', NULL, '2026-07-29 02:21:28', NULL, NULL, '2026-07-29 09:21:28'),
(32, 3, 'CREATE', 'documents', 24, 'Created document IN-2026-000021', NULL, '2026-07-29 02:21:44', NULL, NULL, '2026-07-29 09:21:44'),
(33, 1, 'CREATE', 'documents', 25, 'Created document IN-2026-000022', NULL, '2026-07-29 02:22:28', NULL, NULL, '2026-07-29 09:22:28'),
(34, 2, 'APPROVE', 'documents', 21, 'Approve Document', NULL, '2026-07-29 02:30:22', NULL, NULL, '2026-07-29 09:30:22');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL,
  `department_name` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`department_id`, `department_name`, `description`, `is_active`) VALUES
(1, 'IT', NULL, 1),
(2, 'HR', NULL, 1),
(3, 'Finance', NULL, 1),
(4, 'Accounting', NULL, 1),
(5, 'Management', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `document_id` int(11) NOT NULL,
  `document_no` varchar(50) NOT NULL,
  `external_ref` varchar(100) DEFAULT NULL,
  `document_type` enum('INCOMING','OUTGOING') NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `sender_name` varchar(255) DEFAULT NULL,
  `receiver_name` varchar(255) DEFAULT NULL,
  `document_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `status` enum('Draft','Waiting','Approved','Rejected','Completed') DEFAULT 'Draft',
  `version` int(11) DEFAULT 1,
  `is_deleted` tinyint(1) DEFAULT 0,
  `deleted_at` datetime DEFAULT NULL,
  `priority` enum('Low','Normal','High','Urgent') DEFAULT 'Normal',
  `created_by` int(11) DEFAULT NULL,
  `current_owner` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`document_id`, `document_no`, `external_ref`, `document_type`, `subject`, `description`, `sender_name`, `receiver_name`, `document_date`, `due_date`, `status`, `version`, `is_deleted`, `deleted_at`, `priority`, `created_by`, `current_owner`, `created_at`, `updated_at`, `updated_by`) VALUES
(1, 'IN-2026-000001', NULL, 'INCOMING', 'Purchase Request', 'Purchase New Computer', 'ABC จำกัด', 'IT Department', '2026-07-01', NULL, 'Approved', 1, 0, NULL, 'Normal', 3, 2, '2026-07-28 21:40:37', '2026-07-28 22:32:17', NULL),
(2, 'IN-2026-000002', NULL, 'INCOMING', 'Network Maintenance', 'Network Upgrade', 'CAT Telecom', 'IT Department', '2026-07-02', NULL, 'Approved', 1, 0, NULL, 'Normal', 3, NULL, '2026-07-28 21:40:37', '2026-07-28 21:40:37', NULL),
(3, 'IN-2026-000003', NULL, 'INCOMING', 'Recruitment', 'Resume Candidate', 'JobThai', 'HR Department', '2026-07-03', NULL, 'Approved', 1, 0, NULL, 'Normal', 4, NULL, '2026-07-28 21:40:37', '2026-07-28 22:44:45', NULL),
(5, 'OUT-2026-000002', NULL, 'OUTGOING', 'Contract', 'Service Contract', 'Company', 'Supplier B', '2026-07-05', NULL, 'Waiting', 1, 0, NULL, 'Normal', 3, NULL, '2026-07-28 21:40:37', '2026-07-29 01:48:39', NULL),
(6, 'IN-2026-000006', NULL, 'INCOMING', 'หนังสือขออนุมัติจัดซื้ออุปกรณ์ IT', 'ขออนุมัติซื้อจอคอมพิวเตอร์ 2 จอ', 'บริษัท ABC จำกัด', 'แผนก IT', NULL, NULL, 'Waiting', 1, 0, NULL, 'High', 1, 2, '2026-07-28 22:26:30', '2026-07-29 01:32:34', NULL),
(7, 'IN-2026-000007', '213213', 'INCOMING', 'dsadasd', 'dasdsad', 'adsadsa', 'dasdsa', NULL, NULL, 'Approved', 1, 1, '2026-07-29 08:48:34', 'Normal', 1, 2, '2026-07-28 23:17:16', '2026-07-29 01:48:34', 1),
(8, 'IN-2026-000008', 'dsadasdsa', 'INCOMING', 'dsadasd', 'dddasdad', 'sadasdsa', 'asdasda', NULL, NULL, 'Waiting', 1, 0, NULL, 'Normal', 2, 2, '2026-07-28 23:19:14', '2026-07-29 01:32:24', NULL),
(9, 'OUT-2026-000004', NULL, 'OUTGOING', 'dsadasd', 'asdasd', 'dsadasd', 'sadasd', NULL, NULL, 'Approved', 1, 0, NULL, 'Normal', 2, 2, '2026-07-28 23:20:15', '2026-07-29 00:55:54', NULL),
(10, 'OUT-2026-000005', NULL, 'OUTGOING', 'dasdasd', 'sdaasd', 'dsadasd', 'dasdasd', NULL, NULL, 'Waiting', 1, 0, NULL, 'Normal', 2, 2, '2026-07-28 23:20:42', '2026-07-29 01:03:22', NULL),
(11, 'IN-2026-000009', 'ฟหกฟหก', 'INCOMING', 'ฟหกฟหก', 'หกฟหกหฟก', 'ฟหกฟหก', 'หกฟกฟ', NULL, NULL, 'Rejected', 1, 0, NULL, 'Normal', 2, 2, '2026-07-28 23:55:01', '2026-07-29 00:51:45', NULL),
(12, 'IN-2026-000010', 'asddasd', 'INCOMING', 'dasdsa', 'asdasda', 'dasdas', 'dasdsad', NULL, NULL, 'Approved', 1, 0, NULL, 'Normal', 1, 2, '2026-07-29 00:31:25', '2026-07-29 00:41:34', NULL),
(13, 'IN-2026-000011', NULL, 'INCOMING', 'ad', 'asdads', 'asda', 'sdasd', NULL, NULL, 'Waiting', 1, 0, NULL, 'Normal', 1, NULL, '2026-07-29 01:41:27', '2026-07-29 01:44:24', NULL),
(14, 'IN-2026-000012', 'asdasd', 'INCOMING', 'asdasdasd', '123123', 'asdasda', 'dasdasda', NULL, NULL, 'Approved', 1, 0, NULL, 'Normal', 3, NULL, '2026-07-29 01:49:09', '2026-07-29 01:49:31', NULL),
(15, 'IN-2026-000013', 'asd', 'INCOMING', 'asd', 'asd', 'asdsa', 'dsad', NULL, NULL, 'Draft', 1, 0, NULL, 'Normal', 1, NULL, '2026-07-29 02:00:02', '2026-07-29 02:00:02', NULL),
(16, 'IN-2026-000014', 'sadas', 'INCOMING', 'dsadsad', 'asdasds', 'dsadsad', 'asdas', NULL, NULL, 'Draft', 1, 0, NULL, 'Normal', 2, NULL, '2026-07-29 02:00:16', '2026-07-29 02:00:16', NULL),
(17, 'IN-2026-000015', 'sadsa', 'INCOMING', 'sadsad', 'adsad', 'dsa', 'ad', NULL, NULL, 'Waiting', 1, 0, NULL, 'Normal', 3, NULL, '2026-07-29 02:01:23', '2026-07-29 02:01:26', NULL),
(18, 'IN-2026-000016', 'sadsad', 'INCOMING', 'asdasd', 'adsadasd', 'asdad', 'sads', NULL, NULL, 'Draft', 1, 0, NULL, 'Normal', 1, NULL, '2026-07-29 02:07:30', '2026-07-29 02:07:30', NULL),
(19, 'IN-2026-000017', 'asdasd', 'INCOMING', 'asdasdaddf', 'sdfsdfdsf', 'afsdafd', 'fdsf', NULL, NULL, 'Draft', 1, 0, NULL, 'Normal', 3, NULL, '2026-07-29 02:18:19', '2026-07-29 02:18:19', NULL),
(20, 'IN-2026-000018', NULL, 'INCOMING', 'ฟหกฟหกฟห', 'ฟหกฟก', 'กฟกฟ', 'หกฟก', NULL, NULL, 'Draft', 1, 0, NULL, 'Normal', 3, NULL, '2026-07-29 02:19:56', '2026-07-29 02:19:56', NULL),
(21, 'IN-2026-000019', 'ฟหกฟหก', 'INCOMING', 'ฟหกฟหก', 'กฟห', 'ฟหก', 'กฟหก', NULL, NULL, 'Approved', 1, 0, NULL, 'Normal', 3, NULL, '2026-07-29 02:20:17', '2026-07-29 02:30:22', NULL),
(22, 'IN-2026-000020', 'กฟหกฟหก', 'INCOMING', 'กฟหกฟห', 'ฟก', 'ฟกห', 'ฟกฟหก', NULL, NULL, 'Draft', 1, 0, NULL, 'Normal', 3, NULL, '2026-07-29 02:21:19', '2026-07-29 02:21:19', NULL),
(23, 'OUT-2026-000006', 'ฟก', 'OUTGOING', 'หฟกฟห', 'ฟกฟก', 'กฟหก', 'กฟหก', NULL, NULL, 'Draft', 1, 0, NULL, 'Normal', 3, NULL, '2026-07-29 02:21:28', '2026-07-29 02:21:28', NULL),
(24, 'IN-2026-000021', 'ๅ', 'INCOMING', '1', '1', '1', '1', NULL, NULL, 'Draft', 1, 0, NULL, 'Normal', 3, NULL, '2026-07-29 02:21:44', '2026-07-29 02:21:44', NULL),
(25, 'IN-2026-000022', NULL, 'INCOMING', '2', '2', '2', '2', NULL, NULL, 'Draft', 1, 0, NULL, 'Normal', 1, NULL, '2026-07-29 02:22:28', '2026-07-29 02:22:28', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `document_approvals`
--

CREATE TABLE `document_approvals` (
  `approval_id` int(11) NOT NULL,
  `document_id` int(11) NOT NULL,
  `approver_id` int(11) NOT NULL,
  `step_no` int(11) NOT NULL,
  `status` enum('Pending','Approved','Rejected','Returned') DEFAULT 'Pending',
  `approved_at` datetime DEFAULT NULL,
  `action_at` datetime DEFAULT NULL,
  `action_by` int(11) DEFAULT NULL,
  `remark` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `document_files`
--

CREATE TABLE `document_files` (
  `file_id` int(11) NOT NULL,
  `document_id` int(11) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `file_size` bigint(20) DEFAULT NULL,
  `uploaded_by` int(11) DEFAULT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `mime_type` varchar(100) DEFAULT NULL,
  `extension` varchar(20) DEFAULT NULL,
  `download_count` int(11) DEFAULT 0,
  `is_deleted` tinyint(1) DEFAULT 0,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `document_files`
--

INSERT INTO `document_files` (`file_id`, `document_id`, `file_name`, `file_path`, `file_size`, `uploaded_by`, `uploaded_at`, `mime_type`, `extension`, `download_count`, `is_deleted`, `deleted_at`) VALUES
(1, 1, 'purchase.pdf', 'uploads/purchase.pdf', 204800, 3, '2026-07-28 21:40:37', NULL, NULL, 0, 0, NULL),
(2, 1, 'invoice.pdf', 'uploads/invoice.pdf', 500000, 3, '2026-07-28 21:40:37', NULL, NULL, 0, 0, NULL),
(3, 2, 'network.pdf', 'uploads/network.pdf', 650000, 3, '2026-07-28 21:40:37', NULL, NULL, 0, 0, NULL),
(4, 3, 'resume.pdf', 'uploads/resume.pdf', 300000, 4, '2026-07-28 21:40:37', NULL, NULL, 0, 0, NULL),
(6, 10, 'dis.jpg', 'uploads/1785280842190-297725075.jpg', 27662, 2, '2026-07-28 23:20:42', 'image/jpeg', '.jpg', 0, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `document_receivers`
--

CREATE TABLE `document_receivers` (
  `receiver_id` int(11) NOT NULL,
  `document_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `receiver_type` enum('TO','CC') DEFAULT 'TO',
  `received_at` datetime DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `read_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `document_routes`
--

CREATE TABLE `document_routes` (
  `route_id` int(11) NOT NULL,
  `document_id` int(11) DEFAULT NULL,
  `from_user` int(11) DEFAULT NULL,
  `to_user` int(11) DEFAULT NULL,
  `action` enum('Send','Approve','Reject','Receive') DEFAULT NULL,
  `note` text DEFAULT NULL,
  `action_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `received_at` datetime DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `is_deleted` tinyint(1) DEFAULT 0,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `document_routes`
--

INSERT INTO `document_routes` (`route_id`, `document_id`, `from_user`, `to_user`, `action`, `note`, `action_date`, `received_at`, `is_read`, `is_deleted`, `deleted_at`) VALUES
(1, 1, 3, 2, 'Send', 'ส่งให้ผู้จัดการ', '2026-07-28 21:40:37', NULL, 0, 0, NULL),
(2, 1, 2, 2, 'Approve', 'อนุมัติ', '2026-07-28 21:40:37', NULL, 0, 0, NULL),
(3, 2, 3, 2, 'Send', 'ส่งตรวจสอบ', '2026-07-28 21:40:37', NULL, 0, 0, NULL),
(4, 2, 2, 2, 'Approve', 'อนุมัติเรียบร้อย', '2026-07-28 21:40:37', NULL, 0, 0, NULL),
(5, 3, 4, 2, 'Send', 'รออนุมัติ', '2026-07-28 21:40:37', NULL, 0, 0, NULL),
(7, 5, 3, 2, 'Send', 'รออนุมัติ', '2026-07-28 21:40:37', NULL, 0, 0, NULL),
(8, 1, 1, 2, 'Send', 'ส่งขออนุมัติจัดซื้อครับ', '2026-07-28 22:31:43', NULL, 0, 0, NULL),
(9, 1, 1, 1, 'Approve', 'อนุมัติเรียบร้อย ดำเนินการต่อได้', '2026-07-28 22:32:17', NULL, 0, 0, NULL),
(10, 3, 1, 1, 'Approve', 'อนุมัติเรียบร้อย', '2026-07-28 22:44:45', NULL, 0, 0, NULL),
(11, 11, 2, 2, 'Send', 'ส่งตรวจสอบ / รออนุมัติ', '2026-07-29 00:06:15', NULL, 0, 0, NULL),
(12, 12, 1, 2, 'Send', 'ส่งตรวจสอบ / รออนุมัติ', '2026-07-29 00:39:36', NULL, 0, 0, NULL),
(13, 12, 1, 1, 'Approve', 'อนุมัติเรียบร้อย', '2026-07-29 00:41:34', NULL, 0, 0, NULL),
(14, 11, 1, 2, 'Reject', 'ไม่อนุมัติ', '2026-07-29 00:51:45', NULL, 0, 0, NULL),
(15, 9, 1, 2, 'Send', 'ส่งตรวจสอบ / รออนุมัติ', '2026-07-29 00:55:52', NULL, 0, 0, NULL),
(16, 9, 1, 1, 'Approve', 'อนุมัติเรียบร้อย', '2026-07-29 00:55:54', NULL, 0, 0, NULL),
(17, 10, 5, 2, 'Send', 'ส่งตรวจสอบ / รออนุมัติ', '2026-07-29 01:03:22', NULL, 0, 0, NULL),
(18, 7, 5, 2, 'Send', 'ส่งตรวจสอบ / รออนุมัติ', '2026-07-29 01:03:48', NULL, 0, 0, NULL),
(19, 8, 5, 2, 'Send', 'ส่งตรวจสอบ / รออนุมัติ', '2026-07-29 01:32:24', NULL, 0, 0, NULL),
(20, 6, 5, 2, 'Send', 'ส่งตรวจสอบ / รออนุมัติ', '2026-07-29 01:32:34', NULL, 0, 0, NULL),
(21, 13, 1, NULL, 'Send', 'ส่งตรวจสอบ / รออนุมัติ', '2026-07-29 01:44:24', NULL, 0, 0, NULL),
(22, 7, 1, 1, 'Approve', 'อนุมัติเรียบร้อย', '2026-07-29 01:48:32', NULL, 0, 0, NULL),
(23, 5, 1, NULL, 'Send', 'ส่งตรวจสอบ / รออนุมัติ', '2026-07-29 01:48:39', NULL, 0, 0, NULL),
(24, 14, 3, NULL, 'Send', 'ส่งตรวจสอบ / รออนุมัติ', '2026-07-29 01:49:12', NULL, 0, 0, NULL),
(25, 14, 2, 2, 'Approve', 'อนุมัติเรียบร้อย', '2026-07-29 01:49:31', NULL, 0, 0, NULL),
(26, 17, 3, NULL, 'Send', 'ส่งตรวจสอบ / รออนุมัติ', '2026-07-29 02:01:26', NULL, 0, 0, NULL),
(27, 21, 3, NULL, 'Send', 'ส่งตรวจสอบ / รออนุมัติ', '2026-07-29 02:20:24', NULL, 0, 0, NULL),
(28, 21, 2, 2, 'Approve', 'อนุมัติเรียบร้อย', '2026-07-29 02:30:22', NULL, 0, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `document_status_history`
--

CREATE TABLE `document_status_history` (
  `history_id` int(11) NOT NULL,
  `document_id` int(11) DEFAULT NULL,
  `old_status` varchar(50) DEFAULT NULL,
  `new_status` varchar(50) DEFAULT NULL,
  `changed_by` int(11) DEFAULT NULL,
  `changed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `remark` text DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `document_status_history`
--

INSERT INTO `document_status_history` (`history_id`, `document_id`, `old_status`, `new_status`, `changed_by`, `changed_at`, `remark`, `is_deleted`, `deleted_at`) VALUES
(1, 1, 'Draft', 'Waiting', 3, '2026-07-28 21:40:37', NULL, 0, NULL),
(2, 1, 'Waiting', 'Approved', 2, '2026-07-28 21:40:37', NULL, 0, NULL),
(3, 1, 'Approved', 'Completed', 2, '2026-07-28 21:40:37', NULL, 0, NULL),
(4, 2, 'Draft', 'Waiting', 3, '2026-07-28 21:40:37', NULL, 0, NULL),
(5, 2, 'Waiting', 'Approved', 2, '2026-07-28 21:40:37', NULL, 0, NULL),
(6, 3, 'Draft', 'Waiting', 4, '2026-07-28 21:40:37', NULL, 0, NULL),
(8, 1, 'Completed', 'Waiting', 1, '2026-07-28 22:31:43', 'ส่งขออนุมัติจัดซื้อครับ', 0, NULL),
(9, 1, 'Waiting', 'Approved', 1, '2026-07-28 22:32:17', 'อนุมัติเรียบร้อย ดำเนินการต่อได้', 0, NULL),
(10, 3, 'Waiting', 'Approved', 1, '2026-07-28 22:44:45', 'อนุมัติเรียบร้อย', 0, NULL),
(11, 11, 'Draft', 'Waiting', 2, '2026-07-29 00:06:15', 'ส่งตรวจสอบ / รออนุมัติ', 0, NULL),
(12, 12, 'Draft', 'Waiting', 1, '2026-07-29 00:39:36', 'ส่งตรวจสอบ / รออนุมัติ', 0, NULL),
(13, 12, 'Waiting', 'Approved', 1, '2026-07-29 00:41:34', 'อนุมัติเรียบร้อย', 0, NULL),
(14, 11, 'Waiting', 'Rejected', 1, '2026-07-29 00:51:45', 'ไม่อนุมัติ', 0, NULL),
(15, 9, 'Draft', 'Waiting', 1, '2026-07-29 00:55:52', 'ส่งตรวจสอบ / รออนุมัติ', 0, NULL),
(16, 9, 'Waiting', 'Approved', 1, '2026-07-29 00:55:54', 'อนุมัติเรียบร้อย', 0, NULL),
(17, 10, 'Draft', 'Waiting', 5, '2026-07-29 01:03:22', 'ส่งตรวจสอบ / รออนุมัติ', 0, NULL),
(18, 7, 'Draft', 'Waiting', 5, '2026-07-29 01:03:48', 'ส่งตรวจสอบ / รออนุมัติ', 0, NULL),
(19, 8, 'Draft', 'Waiting', 5, '2026-07-29 01:32:24', 'ส่งตรวจสอบ / รออนุมัติ', 0, NULL),
(20, 6, 'Draft', 'Waiting', 5, '2026-07-29 01:32:34', 'ส่งตรวจสอบ / รออนุมัติ', 0, NULL),
(21, 13, 'Draft', 'Waiting', 1, '2026-07-29 01:44:24', 'ส่งตรวจสอบ / รออนุมัติ', 0, NULL),
(22, 7, 'Waiting', 'Approved', 1, '2026-07-29 01:48:32', 'อนุมัติเรียบร้อย', 0, NULL),
(23, 5, 'Draft', 'Waiting', 1, '2026-07-29 01:48:39', 'ส่งตรวจสอบ / รออนุมัติ', 0, NULL),
(24, 14, 'Draft', 'Waiting', 3, '2026-07-29 01:49:12', 'ส่งตรวจสอบ / รออนุมัติ', 0, NULL),
(25, 14, 'Waiting', 'Approved', 2, '2026-07-29 01:49:31', 'อนุมัติเรียบร้อย', 0, NULL),
(26, 17, 'Draft', 'Waiting', 3, '2026-07-29 02:01:26', 'ส่งตรวจสอบ / รออนุมัติ', 0, NULL),
(27, 21, 'Draft', 'Waiting', 3, '2026-07-29 02:20:24', 'ส่งตรวจสอบ / รออนุมัติ', 0, NULL),
(28, 21, 'Waiting', 'Approved', 2, '2026-07-29 02:30:22', 'อนุมัติเรียบร้อย', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `document_id` int(11) DEFAULT NULL,
  `notification_type` enum('Workflow','Approve','Reject','Reminder','System') DEFAULT 'System'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notification_id`, `user_id`, `title`, `message`, `is_read`, `created_at`, `document_id`, `notification_type`) VALUES
(1, 2, 'Document Waiting', 'Document IN-2026-000003 waiting for approval', 0, '2026-07-28 21:40:37', NULL, 'System'),
(2, 3, 'Document Approved', 'Document IN-2026-000002 approved', 1, '2026-07-28 21:40:37', NULL, 'System'),
(3, 4, 'Document Sent', 'Your document has been sent', 0, '2026-07-28 21:40:37', NULL, 'System'),
(4, 5, 'New Document', 'New document received', 0, '2026-07-28 21:40:37', NULL, 'System'),
(5, 2, 'Document Waiting', 'You have a document waiting for review', 0, '2026-07-28 22:31:43', 1, 'Workflow'),
(6, 2, 'Document Waiting', 'You have a document waiting for review', 0, '2026-07-29 00:06:15', 11, 'Workflow'),
(7, 2, 'Document Waiting', 'You have a document waiting for review', 0, '2026-07-29 00:39:36', 12, 'Workflow'),
(8, 2, 'Document Rejected', 'Your document IN-2026-000009 was rejected. Remark: ไม่อนุมัติ', 0, '2026-07-29 00:51:45', 11, 'Workflow'),
(9, 2, 'Document Waiting', 'You have a document waiting for review', 0, '2026-07-29 00:55:52', 9, 'Workflow'),
(10, 2, 'Document Waiting', 'You have a document waiting for review', 0, '2026-07-29 01:03:22', 10, 'Workflow'),
(11, 2, 'Document Waiting', 'You have a document waiting for review', 0, '2026-07-29 01:03:48', 7, 'Workflow'),
(12, 2, 'Document Waiting', 'You have a document waiting for review', 0, '2026-07-29 01:32:24', 8, 'Workflow'),
(13, 2, 'Document Waiting', 'You have a document waiting for review', 0, '2026-07-29 01:32:34', 6, 'Workflow'),
(14, NULL, 'Document Waiting', 'You have a document waiting for review', 0, '2026-07-29 01:44:24', 13, 'Workflow'),
(15, NULL, 'Document Waiting', 'You have a document waiting for review', 0, '2026-07-29 01:48:39', 5, 'Workflow'),
(16, NULL, 'Document Waiting', 'You have a document waiting for review', 0, '2026-07-29 01:49:12', 14, 'Workflow'),
(17, NULL, 'Document Waiting', 'You have a document waiting for review', 0, '2026-07-29 02:01:26', 17, 'Workflow'),
(18, NULL, 'Document Waiting', 'You have a document waiting for review', 0, '2026-07-29 02:20:24', 21, 'Workflow');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `permission_id` int(11) NOT NULL,
  `permission_name` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`permission_id`, `permission_name`, `description`, `created_at`) VALUES
(1, 'document.create', 'Create document', '2026-07-28 21:46:42'),
(2, 'document.view', 'View document', '2026-07-28 21:46:42'),
(3, 'document.edit', 'Edit document', '2026-07-28 21:46:42'),
(4, 'document.delete', 'Delete document', '2026-07-28 21:46:42'),
(5, 'document.send', 'Send document', '2026-07-28 21:46:42'),
(6, 'document.receive', 'Receive document', '2026-07-28 21:46:42'),
(7, 'document.approve', 'Approve document', '2026-07-28 21:46:42'),
(8, 'document.reject', 'Reject document', '2026-07-28 21:46:42'),
(9, 'document.download', 'Download attachment', '2026-07-28 21:46:42'),
(10, 'dashboard.view', 'View dashboard', '2026-07-28 21:46:42'),
(11, 'user.manage', 'Manage users', '2026-07-28 21:46:42');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`, `description`) VALUES
(1, 'Admin', NULL),
(2, 'Manager', NULL),
(3, 'Officer', NULL),
(4, 'Viewer', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role_permissions`
--

CREATE TABLE `role_permissions` (
  `role_permission_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role_permissions`
--

INSERT INTO `role_permissions` (`role_permission_id`, `role_id`, `permission_id`) VALUES
(3, 1, 1),
(10, 1, 2),
(6, 1, 3),
(4, 1, 4),
(9, 1, 5),
(7, 1, 6),
(2, 1, 7),
(8, 1, 8),
(5, 1, 9),
(1, 1, 10),
(11, 1, 11),
(16, 2, 1),
(17, 2, 2),
(18, 2, 3),
(19, 2, 5),
(20, 2, 6),
(29, 2, 7),
(30, 2, 8),
(21, 2, 9),
(32, 3, 1),
(22, 3, 2),
(33, 3, 5),
(23, 3, 7),
(24, 3, 8),
(25, 3, 9),
(26, 3, 10),
(35, 4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `running_numbers`
--

CREATE TABLE `running_numbers` (
  `running_id` int(11) NOT NULL,
  `year` int(11) DEFAULT NULL,
  `document_type` enum('INCOMING','OUTGOING') DEFAULT NULL,
  `last_number` int(11) DEFAULT 0,
  `prefix` varchar(10) DEFAULT NULL,
  `digit` int(11) DEFAULT 6
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `running_numbers`
--

INSERT INTO `running_numbers` (`running_id`, `year`, `document_type`, `last_number`, `prefix`, `digit`) VALUES
(1, 2026, 'INCOMING', 22, NULL, 6),
(2, 2026, 'OUTGOING', 6, NULL, 6);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `fullname` varchar(150) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `last_login` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `role_id`, `department_id`, `created_by`, `username`, `password_hash`, `fullname`, `email`, `phone`, `is_active`, `last_login`, `created_at`, `updated_at`) VALUES
(1, 1, 5, NULL, 'admin', '$2y$12$D2pgxelgSmtwGFhWlGQ.vO8J6PTa5023gBbK1jCBWUxJsh.Qs.qaO', 'System Admin', 'admin@company.com', '0811111111', 1, NULL, '2026-07-28 21:40:37', '2026-07-28 22:13:44'),
(2, 2, 5, NULL, 'manager', '$2y$12$D2pgxelgSmtwGFhWlGQ.vO8J6PTa5023gBbK1jCBWUxJsh.Qs.qaO', 'John Manager', 'manager@company.com', '0822222222', 1, NULL, '2026-07-28 21:40:37', '2026-07-28 22:13:47'),
(3, 3, 1, NULL, 'it01', '$2y$12$D2pgxelgSmtwGFhWlGQ.vO8J6PTa5023gBbK1jCBWUxJsh.Qs.qaO', 'Somchai IT', 'it01@company.com', '0833333333', 1, NULL, '2026-07-28 21:40:37', '2026-07-28 22:13:49'),
(4, 3, 2, NULL, 'hr01', '$2y$12$D2pgxelgSmtwGFhWlGQ.vO8J6PTa5023gBbK1jCBWUxJsh.Qs.qaO', 'Suda HR', 'hr01@company.com', '0844444444', 1, NULL, '2026-07-28 21:40:37', '2026-07-28 22:13:51'),
(5, 4, 3, NULL, 'viewer', '$2y$12$D2pgxelgSmtwGFhWlGQ.vO8J6PTa5023gBbK1jCBWUxJsh.Qs.qaO', 'Viewer User', 'viewer@company.com', '0855555555', 1, NULL, '2026-07-28 21:40:37', '2026-07-28 22:13:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD PRIMARY KEY (`audit_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`document_id`),
  ADD UNIQUE KEY `document_no` (`document_no`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `fk_documents_owner` (`current_owner`),
  ADD KEY `fk_documents_updatedby` (`updated_by`);

--
-- Indexes for table `document_approvals`
--
ALTER TABLE `document_approvals`
  ADD PRIMARY KEY (`approval_id`),
  ADD UNIQUE KEY `document_id` (`document_id`,`step_no`),
  ADD KEY `fk_document_approval_user` (`approver_id`),
  ADD KEY `fk_document_approval_action_by` (`action_by`);

--
-- Indexes for table `document_files`
--
ALTER TABLE `document_files`
  ADD PRIMARY KEY (`file_id`),
  ADD KEY `document_id` (`document_id`),
  ADD KEY `uploaded_by` (`uploaded_by`);

--
-- Indexes for table `document_receivers`
--
ALTER TABLE `document_receivers`
  ADD PRIMARY KEY (`receiver_id`),
  ADD KEY `document_id` (`document_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `document_routes`
--
ALTER TABLE `document_routes`
  ADD PRIMARY KEY (`route_id`),
  ADD KEY `document_id` (`document_id`),
  ADD KEY `from_user` (`from_user`),
  ADD KEY `to_user` (`to_user`);

--
-- Indexes for table `document_status_history`
--
ALTER TABLE `document_status_history`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `document_id` (`document_id`),
  ADD KEY `changed_by` (`changed_by`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `fk_notification_document` (`document_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`permission_id`),
  ADD UNIQUE KEY `permission_name` (`permission_name`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- Indexes for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD PRIMARY KEY (`role_permission_id`),
  ADD UNIQUE KEY `role_id` (`role_id`,`permission_id`),
  ADD KEY `fk_role_permission_permission` (`permission_id`);

--
-- Indexes for table `running_numbers`
--
ALTER TABLE `running_numbers`
  ADD PRIMARY KEY (`running_id`),
  ADD UNIQUE KEY `year` (`year`,`document_type`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `department_id` (`department_id`),
  ADD KEY `fk_users_createdby` (`created_by`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `audit_logs`
--
ALTER TABLE `audit_logs`
  MODIFY `audit_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `document_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `document_approvals`
--
ALTER TABLE `document_approvals`
  MODIFY `approval_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `document_files`
--
ALTER TABLE `document_files`
  MODIFY `file_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `document_receivers`
--
ALTER TABLE `document_receivers`
  MODIFY `receiver_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `document_routes`
--
ALTER TABLE `document_routes`
  MODIFY `route_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `document_status_history`
--
ALTER TABLE `document_status_history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `permission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `role_permissions`
--
ALTER TABLE `role_permissions`
  MODIFY `role_permission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `running_numbers`
--
ALTER TABLE `running_numbers`
  MODIFY `running_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD CONSTRAINT `audit_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `fk_documents_owner` FOREIGN KEY (`current_owner`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `fk_documents_updatedby` FOREIGN KEY (`updated_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `document_approvals`
--
ALTER TABLE `document_approvals`
  ADD CONSTRAINT `fk_document_approval_action_by` FOREIGN KEY (`action_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `fk_document_approval_document` FOREIGN KEY (`document_id`) REFERENCES `documents` (`document_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_document_approval_user` FOREIGN KEY (`approver_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `document_files`
--
ALTER TABLE `document_files`
  ADD CONSTRAINT `document_files_ibfk_1` FOREIGN KEY (`document_id`) REFERENCES `documents` (`document_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `document_files_ibfk_2` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `document_receivers`
--
ALTER TABLE `document_receivers`
  ADD CONSTRAINT `document_receivers_ibfk_1` FOREIGN KEY (`document_id`) REFERENCES `documents` (`document_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `document_receivers_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `document_routes`
--
ALTER TABLE `document_routes`
  ADD CONSTRAINT `document_routes_ibfk_1` FOREIGN KEY (`document_id`) REFERENCES `documents` (`document_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `document_routes_ibfk_2` FOREIGN KEY (`from_user`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `document_routes_ibfk_3` FOREIGN KEY (`to_user`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `document_status_history`
--
ALTER TABLE `document_status_history`
  ADD CONSTRAINT `document_status_history_ibfk_1` FOREIGN KEY (`document_id`) REFERENCES `documents` (`document_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `document_status_history_ibfk_2` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `fk_notification_document` FOREIGN KEY (`document_id`) REFERENCES `documents` (`document_id`),
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD CONSTRAINT `fk_role_permission_permission` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_role_permission_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_createdby` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
