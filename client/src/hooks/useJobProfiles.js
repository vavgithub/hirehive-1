import { useQuery } from "@tanstack/react-query";
import { fetchJobProfiles } from "../services/admin.service";
import { getJobProfileAsOptions } from "../config/jobprofile.config";

export function useJobProfiles() {
  const query = useQuery({
    queryKey: ["jobProfiles"],
    queryFn: fetchJobProfiles,
  });

  const options = query.data?.profiles?.length
    ? query.data.profiles.map((profile) => ({ label: profile.name, value: profile.name }))
    : getJobProfileAsOptions();

  return {
    options,
    names: options.map((option) => option.value),
    isLoading: query.isLoading,
  };
}
