USE app_db;

-- Test Users
INSERT INTO
	users (name, password_sha512, email)
VALUES
	(
		'admin',
		'c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23f3eab1d80b931dd472634dfac71cd34ebc35d16ab7fb8a90c81f975113d6c7538dc69dd8de9077ec',
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

-- Test MAC Addresses (Hex values as strings)
INSERT INTO
	mac_address (sect1, sect2, sect3, sect4, sect5, sect6)
VALUES
	('00', '1A', '2B', '3C', '4D', '5E'),
	('AA', 'BB', 'CC', 'DD', 'EE', 'FF'),
	('12', '34', '56', '78', '9A', 'BC'),
	('F0', 'E1', 'D2', 'C3', 'B4', 'A5');

-- Test Entries
INSERT INTO
	entry (name, networkcard, mac_address_id, user)
VALUES
	(
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

-- Test Tokens
INSERT INTO
	tokens (token, users_id)
VALUES
	(
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
INSERT INTO
	permissions (id, permission, users_id)
VALUES
	(1, 'read_users', 1),
	(2, 'write_users', 1),
	(3, 'delete_users', 1),
	(4, 'read_entries', 1),
	(5, 'write_entries', 1),
	(6, 'read_users', 2),
	(7, 'read_entries', 2),
	(8, 'read_users', 3),
	(9, 'read_entries', 3),
	(10, 'write_entries', 3);