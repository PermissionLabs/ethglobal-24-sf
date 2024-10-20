// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.7.0 <0.9.0;

import "@safe-global/safe-contracts/contracts/Safe.sol";
import "@safe-global/safe-contracts/contracts/base/GuardManager.sol";
import "@safe-global/safe-contracts/contracts/common/Enum.sol";

contract SpotGuard is BaseGuard {
    mapping(address => bool) public whitelist;
    mapping(address => bool) public blacklist;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // Events
    event AddedToWhitelist(address indexed _address);
    event RemovedFromWhitelist(address indexed _address);
    event AddedToBlacklist(address indexed _address);
    event RemovedFromBlacklist(address indexed _address);

    // Modifier to restrict function access to the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    // Add addresses to the whitelist in bulk (Owner only)
    function addToWhitelist(address[] memory _addresses) public onlyOwner {
        for (uint i = 0; i < _addresses.length; i++) {
            address addr = _addresses[i];
            require(!blacklist[addr], "Address is in blacklist, cannot be whitelisted.");
            whitelist[addr] = true;
            emit AddedToWhitelist(addr);
        }
    }

    // Remove addresses from the whitelist in bulk (Owner only)
    function removeFromWhitelist(address[] memory _addresses) public onlyOwner {
        for (uint i = 0; i < _addresses.length; i++) {
            address addr = _addresses[i];
            whitelist[addr] = false;
            emit RemovedFromWhitelist(addr);
        }
    }

    // Add addresses to the blacklist in bulk (Owner only)
    function addToBlacklist(address[] memory _addresses) public onlyOwner {
        for (uint i = 0; i < _addresses.length; i++) {
            address addr = _addresses[i];

            require(!whitelist[addr], "Address is in whitelist, cannot be blacklisted.");
            blacklist[addr] = true;
            emit AddedToBlacklist(addr);
        }
    }

    // Remove addresses from the blacklist in bulk (Owner only)
    function removeFromBlacklist(address[] memory _addresses) public onlyOwner {
        for (uint i = 0; i < _addresses.length; i++) {
            address addr = _addresses[i];

            blacklist[addr] = false;
            emit RemovedFromBlacklist(addr);
        }
    }

    // Check if an address is whitelisted
    function isWhitelisted(address _address) public view returns (bool) {
        return whitelist[_address];
    }

    // Check if an address is blacklisted
    function isBlacklisted(address _address) public view returns (bool) {
        return blacklist[_address];
    }

     // solhint-disable-next-line payable-fallback
    fallback() external {
        // We don't revert on fallback to avoid issues in case of a Safe upgrade
        // E.g. The expected check method might change and then the Safe would be locked.
    }

    /** @notice Checks transactions before execution.
      * @dev This will revert if the `to` address is not whitelisted.
      */
    function checkTransaction(
        address to,
        uint256,
        bytes memory,
        Enum.Operation,
        uint256,
        uint256,
        uint256,
        address,
        address payable,
        bytes memory,
        address
    ) external view override {
        require(
            whitelist[to],
            "WhitelistGuard: Destination address is not whitelisted"
        );

        require(
            !blacklist[to], 
            "Transaction blocked: to address is blacklisted."
        );
    }

    /** @notice Post-transaction check (not used in this example).
      * @dev This function is required by the Guard interface but left empty.
      */
    function checkAfterExecution(bytes32 txHash, bool success) external view override {
        // Optional: Implement logic after transaction execution
    }
}