USE app_db;
-- Test Users
INSERT INTO users (name, password_sha512, email)
VALUES (
		'admin',
		'88d2bb21bcd04f46447a1a01764c0b60982dbade025df37dcf6d8d3eb4a21caa4330505d0d46d3e9e1c427f028c677b227276c409e435b8933c518add5fb5279',
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