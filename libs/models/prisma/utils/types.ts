export type SeedFile = {
  seedName: string;
  path: string;
  dependsOn: string[];
  checksum?: string;
};
