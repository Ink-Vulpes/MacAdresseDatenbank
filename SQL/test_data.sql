USE app_db;
-- Test Users
INSERT INTO users (name, password_sha512, email)
VALUES (
		'admin',
		'4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2',
		'admin@example.com'
	),
	(
		'testuser',
		'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff',
		'testuser@example.com'
	),
	(
		'john_doe',
		'b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86',
		'john.doe@example.com'
	);
-- Test MAC Addresses (decimal byte values)
INSERT INTO mac_address (sect1, sect2, sect3, sect4, sect5, sect6)
VALUES (0, 26, 43, 60, 77, 94),
	(170, 187, 204, 221, 238, 255),
	(18, 52, 86, 120, 154, 188),
	(240, 225, 210, 195, 180, 165);
INSERT INTO mac_address (sect1, sect2, sect3, sect4, sect5, sect6)
VALUES (5, 21, 37, 53, 69, 85),
	(6, 22, 38, 54, 70, 86),
	(7, 23, 39, 55, 71, 87),
	(8, 24, 40, 56, 72, 88),
	(9, 25, 41, 57, 73, 89),
	(10, 26, 42, 58, 74, 90),
	(11, 27, 43, 59, 75, 91),
	(12, 28, 44, 60, 76, 92),
	(13, 29, 45, 61, 77, 93),
	(14, 30, 46, 62, 78, 94),
	(15, 31, 47, 63, 79, 95),
	(16, 32, 48, 64, 80, 96),
	(17, 33, 49, 65, 81, 97),
	(18, 34, 50, 66, 82, 98),
	(19, 35, 51, 67, 83, 99),
	(20, 36, 52, 68, 84, 100),
	(21, 37, 53, 69, 85, 101),
	(22, 38, 54, 70, 86, 102),
	(23, 39, 55, 71, 87, 103),
	(24, 40, 56, 72, 88, 104),
	(25, 41, 57, 73, 89, 105),
	(26, 42, 58, 74, 90, 106),
	(27, 43, 59, 75, 91, 107),
	(28, 44, 60, 76, 92, 108),
	(29, 45, 61, 77, 93, 109),
	(30, 46, 62, 78, 94, 110),
	(31, 47, 63, 79, 95, 111),
	(32, 48, 64, 80, 96, 112),
	(33, 49, 65, 81, 97, 113),
	(34, 50, 66, 82, 98, 114),
	(35, 51, 67, 83, 99, 115),
	(36, 52, 68, 84, 100, 116),
	(37, 53, 69, 85, 101, 117),
	(38, 54, 70, 86, 102, 118),
	(39, 55, 71, 87, 103, 119),
	(40, 56, 72, 88, 104, 120),
	(41, 57, 73, 89, 105, 121),
	(42, 58, 74, 90, 106, 122),
	(43, 59, 75, 91, 107, 123),
	(44, 60, 76, 92, 108, 124),
	(45, 61, 77, 93, 109, 125),
	(46, 62, 78, 94, 110, 126),
	(47, 63, 79, 95, 111, 127),
	(48, 64, 80, 96, 112, 128),
	(49, 65, 81, 97, 113, 129),
	(50, 66, 82, 98, 114, 130),
	(51, 67, 83, 99, 115, 131),
	(52, 68, 84, 100, 116, 132),
	(53, 69, 85, 101, 117, 133),
	(54, 70, 86, 102, 118, 134),
	(55, 71, 87, 103, 119, 135),
	(56, 72, 88, 104, 120, 136),
	(57, 73, 89, 105, 121, 137),
	(58, 74, 90, 106, 122, 138),
	(59, 75, 91, 107, 123, 139),
	(60, 76, 92, 108, 124, 140),
	(61, 77, 93, 109, 125, 141),
	(62, 78, 94, 110, 126, 142),
	(63, 79, 95, 111, 127, 143),
	(64, 80, 96, 112, 128, 144),
	(65, 81, 97, 113, 129, 145),
	(66, 82, 98, 114, 130, 146),
	(67, 83, 99, 115, 131, 147),
	(68, 84, 100, 116, 132, 148),
	(69, 85, 101, 117, 133, 149),
	(70, 86, 102, 118, 134, 150),
	(71, 87, 103, 119, 135, 151),
	(72, 88, 104, 120, 136, 152),
	(73, 89, 105, 121, 137, 153),
	(74, 90, 106, 122, 138, 154),
	(75, 91, 107, 123, 139, 155),
	(76, 92, 108, 124, 140, 156),
	(77, 93, 109, 125, 141, 157),
	(78, 94, 110, 126, 142, 158),
	(79, 95, 111, 127, 143, 159),
	(80, 96, 112, 128, 144, 160),
	(81, 97, 113, 129, 145, 161),
	(82, 98, 114, 130, 146, 162),
	(83, 99, 115, 131, 147, 163),
	(84, 100, 116, 132, 148, 164),
	(85, 101, 117, 133, 149, 165),
	(86, 102, 118, 134, 150, 166),
	(87, 103, 119, 135, 151, 167),
	(88, 104, 120, 136, 152, 168),
	(89, 105, 121, 137, 153, 169),
	(90, 106, 122, 138, 154, 170),
	(91, 107, 123, 139, 155, 171),
	(92, 108, 124, 140, 156, 172),
	(93, 109, 125, 141, 157, 173),
	(94, 110, 126, 142, 158, 174),
	(95, 111, 127, 143, 159, 175),
	(96, 112, 128, 144, 160, 176),
	(97, 113, 129, 145, 161, 177),
	(98, 114, 130, 146, 162, 178),
	(99, 115, 131, 147, 163, 179),
	(100, 116, 132, 148, 164, 180);
-- Test Entries
INSERT INTO entry (name, networkcard, mac_address_id, user)
VALUES (
		'Server-01',
		'Intel Ethernet Controller',
		1,
		'admin'
	),
	(
		'Workstation-A',
		'Realtek PCIe GbE Family Controller',
		2,
		'john_doe'
	),
	(
		'Laptop-Testing',
		'Wireless Network Adapter',
		3,
		'testuser'
	),
	(
		'Gateway-Device',
		'Broadcom NetXtreme Gigabit Ethernet',
		4,
		NULL
	);
INSERT INTO entry (name, networkcard, mac_address_id, user)
VALUES (
		'Device-005',
		'Intel Ethernet Controller',
		5,
		'admin'
	),
	(
		'Device-006',
		'Realtek PCIe GbE Family Controller',
		6,
		'john_doe'
	),
	(
		'Device-007',
		'Wireless Network Adapter',
		7,
		'testuser'
	),
	(
		'Device-008',
		'Broadcom NetXtreme Gigabit Ethernet',
		8,
		NULL
	),
	(
		'Device-009',
		'Intel Ethernet Controller',
		9,
		'admin'
	),
	(
		'Device-010',
		'Realtek PCIe GbE Family Controller',
		10,
		'john_doe'
	),
	(
		'Device-011',
		'Wireless Network Adapter',
		11,
		'testuser'
	),
	(
		'Device-012',
		'Broadcom NetXtreme Gigabit Ethernet',
		12,
		NULL
	),
	(
		'Device-013',
		'Intel Ethernet Controller',
		13,
		'admin'
	),
	(
		'Device-014',
		'Realtek PCIe GbE Family Controller',
		14,
		'john_doe'
	),
	(
		'Device-015',
		'Wireless Network Adapter',
		15,
		'testuser'
	),
	(
		'Device-016',
		'Broadcom NetXtreme Gigabit Ethernet',
		16,
		NULL
	),
	(
		'Device-017',
		'Intel Ethernet Controller',
		17,
		'admin'
	),
	(
		'Device-018',
		'Realtek PCIe GbE Family Controller',
		18,
		'john_doe'
	),
	(
		'Device-019',
		'Wireless Network Adapter',
		19,
		'testuser'
	),
	(
		'Device-020',
		'Broadcom NetXtreme Gigabit Ethernet',
		20,
		NULL
	),
	(
		'Device-021',
		'Intel Ethernet Controller',
		21,
		'admin'
	),
	(
		'Device-022',
		'Realtek PCIe GbE Family Controller',
		22,
		'john_doe'
	),
	(
		'Device-023',
		'Wireless Network Adapter',
		23,
		'testuser'
	),
	(
		'Device-024',
		'Broadcom NetXtreme Gigabit Ethernet',
		24,
		NULL
	),
	(
		'Device-025',
		'Intel Ethernet Controller',
		25,
		'admin'
	),
	(
		'Device-026',
		'Realtek PCIe GbE Family Controller',
		26,
		'john_doe'
	),
	(
		'Device-027',
		'Wireless Network Adapter',
		27,
		'testuser'
	),
	(
		'Device-028',
		'Broadcom NetXtreme Gigabit Ethernet',
		28,
		NULL
	),
	(
		'Device-029',
		'Intel Ethernet Controller',
		29,
		'admin'
	),
	(
		'Device-030',
		'Realtek PCIe GbE Family Controller',
		30,
		'john_doe'
	),
	(
		'Device-031',
		'Wireless Network Adapter',
		31,
		'testuser'
	),
	(
		'Device-032',
		'Broadcom NetXtreme Gigabit Ethernet',
		32,
		NULL
	),
	(
		'Device-033',
		'Intel Ethernet Controller',
		33,
		'admin'
	),
	(
		'Device-034',
		'Realtek PCIe GbE Family Controller',
		34,
		'john_doe'
	),
	(
		'Device-035',
		'Wireless Network Adapter',
		35,
		'testuser'
	),
	(
		'Device-036',
		'Broadcom NetXtreme Gigabit Ethernet',
		36,
		NULL
	),
	(
		'Device-037',
		'Intel Ethernet Controller',
		37,
		'admin'
	),
	(
		'Device-038',
		'Realtek PCIe GbE Family Controller',
		38,
		'john_doe'
	),
	(
		'Device-039',
		'Wireless Network Adapter',
		39,
		'testuser'
	),
	(
		'Device-040',
		'Broadcom NetXtreme Gigabit Ethernet',
		40,
		NULL
	),
	(
		'Device-041',
		'Intel Ethernet Controller',
		41,
		'admin'
	),
	(
		'Device-042',
		'Realtek PCIe GbE Family Controller',
		42,
		'john_doe'
	),
	(
		'Device-043',
		'Wireless Network Adapter',
		43,
		'testuser'
	),
	(
		'Device-044',
		'Broadcom NetXtreme Gigabit Ethernet',
		44,
		NULL
	),
	(
		'Device-045',
		'Intel Ethernet Controller',
		45,
		'admin'
	),
	(
		'Device-046',
		'Realtek PCIe GbE Family Controller',
		46,
		'john_doe'
	),
	(
		'Device-047',
		'Wireless Network Adapter',
		47,
		'testuser'
	),
	(
		'Device-048',
		'Broadcom NetXtreme Gigabit Ethernet',
		48,
		NULL
	),
	(
		'Device-049',
		'Intel Ethernet Controller',
		49,
		'admin'
	),
	(
		'Device-050',
		'Realtek PCIe GbE Family Controller',
		50,
		'john_doe'
	),
	(
		'Device-051',
		'Wireless Network Adapter',
		51,
		'testuser'
	),
	(
		'Device-052',
		'Broadcom NetXtreme Gigabit Ethernet',
		52,
		NULL
	),
	(
		'Device-053',
		'Intel Ethernet Controller',
		53,
		'admin'
	),
	(
		'Device-054',
		'Realtek PCIe GbE Family Controller',
		54,
		'john_doe'
	),
	(
		'Device-055',
		'Wireless Network Adapter',
		55,
		'testuser'
	),
	(
		'Device-056',
		'Broadcom NetXtreme Gigabit Ethernet',
		56,
		NULL
	),
	(
		'Device-057',
		'Intel Ethernet Controller',
		57,
		'admin'
	),
	(
		'Device-058',
		'Realtek PCIe GbE Family Controller',
		58,
		'john_doe'
	),
	(
		'Device-059',
		'Wireless Network Adapter',
		59,
		'testuser'
	),
	(
		'Device-060',
		'Broadcom NetXtreme Gigabit Ethernet',
		60,
		NULL
	),
	(
		'Device-061',
		'Intel Ethernet Controller',
		61,
		'admin'
	),
	(
		'Device-062',
		'Realtek PCIe GbE Family Controller',
		62,
		'john_doe'
	),
	(
		'Device-063',
		'Wireless Network Adapter',
		63,
		'testuser'
	),
	(
		'Device-064',
		'Broadcom NetXtreme Gigabit Ethernet',
		64,
		NULL
	),
	(
		'Device-065',
		'Intel Ethernet Controller',
		65,
		'admin'
	),
	(
		'Device-066',
		'Realtek PCIe GbE Family Controller',
		66,
		'john_doe'
	),
	(
		'Device-067',
		'Wireless Network Adapter',
		67,
		'testuser'
	),
	(
		'Device-068',
		'Broadcom NetXtreme Gigabit Ethernet',
		68,
		NULL
	),
	(
		'Device-069',
		'Intel Ethernet Controller',
		69,
		'admin'
	),
	(
		'Device-070',
		'Realtek PCIe GbE Family Controller',
		70,
		'john_doe'
	),
	(
		'Device-071',
		'Wireless Network Adapter',
		71,
		'testuser'
	),
	(
		'Device-072',
		'Broadcom NetXtreme Gigabit Ethernet',
		72,
		NULL
	),
	(
		'Device-073',
		'Intel Ethernet Controller',
		73,
		'admin'
	),
	(
		'Device-074',
		'Realtek PCIe GbE Family Controller',
		74,
		'john_doe'
	),
	(
		'Device-075',
		'Wireless Network Adapter',
		75,
		'testuser'
	),
	(
		'Device-076',
		'Broadcom NetXtreme Gigabit Ethernet',
		76,
		NULL
	),
	(
		'Device-077',
		'Intel Ethernet Controller',
		77,
		'admin'
	),
	(
		'Device-078',
		'Realtek PCIe GbE Family Controller',
		78,
		'john_doe'
	),
	(
		'Device-079',
		'Wireless Network Adapter',
		79,
		'testuser'
	),
	(
		'Device-080',
		'Broadcom NetXtreme Gigabit Ethernet',
		80,
		NULL
	),
	(
		'Device-081',
		'Intel Ethernet Controller',
		81,
		'admin'
	),
	(
		'Device-082',
		'Realtek PCIe GbE Family Controller',
		82,
		'john_doe'
	),
	(
		'Device-083',
		'Wireless Network Adapter',
		83,
		'testuser'
	),
	(
		'Device-084',
		'Broadcom NetXtreme Gigabit Ethernet',
		84,
		NULL
	),
	(
		'Device-085',
		'Intel Ethernet Controller',
		85,
		'admin'
	),
	(
		'Device-086',
		'Realtek PCIe GbE Family Controller',
		86,
		'john_doe'
	),
	(
		'Device-087',
		'Wireless Network Adapter',
		87,
		'testuser'
	),
	(
		'Device-088',
		'Broadcom NetXtreme Gigabit Ethernet',
		88,
		NULL
	),
	(
		'Device-089',
		'Intel Ethernet Controller',
		89,
		'admin'
	),
	(
		'Device-090',
		'Realtek PCIe GbE Family Controller',
		90,
		'john_doe'
	),
	(
		'Device-091',
		'Wireless Network Adapter',
		91,
		'testuser'
	),
	(
		'Device-092',
		'Broadcom NetXtreme Gigabit Ethernet',
		92,
		NULL
	),
	(
		'Device-093',
		'Intel Ethernet Controller',
		93,
		'admin'
	),
	(
		'Device-094',
		'Realtek PCIe GbE Family Controller',
		94,
		'john_doe'
	),
	(
		'Device-095',
		'Wireless Network Adapter',
		95,
		'testuser'
	),
	(
		'Device-096',
		'Broadcom NetXtreme Gigabit Ethernet',
		96,
		NULL
	),
	(
		'Device-097',
		'Intel Ethernet Controller',
		97,
		'admin'
	),
	(
		'Device-098',
		'Realtek PCIe GbE Family Controller',
		98,
		'john_doe'
	),
	(
		'Device-099',
		'Wireless Network Adapter',
		99,
		'testuser'
	),
	(
		'Device-100',
		'Broadcom NetXtreme Gigabit Ethernet',
		100,
		NULL
	);
-- Test Tokens
INSERT INTO tokens (token, user_id)
VALUES (
		'abc123def456ghi789jkl012mno345pqr678stu901vwx234yz',
		1
	),
	(
		'token_for_testuser_session_12345678901234567890123456',
		2
	),
	(
		'long_authentication_token_for_john_doe_user_session_001',
		3
	),
	(
		'refresh_token_admin_session_active_until_tomorrow_end',
		1
	);
-- Test Permissions
INSERT INTO permissions (id, permission, user_id)
VALUES (1, 'read_users', 1),
	(2, 'write_users', 1),
	(3, 'delete_users', 1),
	(4, 'read_entries', 1),
	(5, 'write_entries', 1),
	(6, 'read_users', 2),
	(7, 'read_entries', 2),
	(8, 'read_users', 3),
	(9, 'read_entries', 3),
	(10, 'write_entries', 3);