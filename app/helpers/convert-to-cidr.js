import { helper } from '@ember/component/helper';

export default helper(function convertToCidr([subnetMask]) {
  // Split the subnet mask into its octets
  const octets = subnetMask.split(".");
  
  // Convert each octet to binary and count the '1' bits
  let cidr = 0;
  for (const octet of octets) {
      // Convert the octet to a binary string
      const binary = parseInt(octet, 10).toString(2);
      // Count the '1' bits in the binary string
      cidr += binary.split("1").length - 1;
  }
  
  return cidr;
});
