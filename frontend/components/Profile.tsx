import { View, ImageBackground } from "react-native";
import Avatar from "./Avatar";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/api/axiosDefaults";
import CassetteTop from "@/assets/images/cassette-top.png";
import Counter from "./Counter";
import BrandText from "./BrandText";

type Profile = {
  id: number;
  owner: string;
  is_owner: boolean;
  created_at: string;
  image: string | '';
  playlist_count: number;
};

type ProfileProps = {
  userId: number;
};

export default function Profile({userId} : ProfileProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosInstance.get(`profiles/${userId}/`)
        setProfile(data);
        setHasLoaded(true);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }
    fetchProfile();
  }, [userId]);

  return (
    <View className="relative container xl:w-1/3 h-1/4 bg-dark p-2.5 sm:p-1.5">
      <ImageBackground source={CassetteTop} resizeMode="cover" borderTopLeftRadius={45} borderTopRightRadius={45} borderBottomLeftRadius={15} borderBottomRightRadius={15} className="h-full w-full">
        {hasLoaded && (
          <>
            <View className="sticky">
              <View className="absolute top-3 left-3">
                <Avatar src={profile.image} alt={`${profile.owner}'s avatar`} height={120} />
              </View>
              <View className="absolute top-1 left-[40%]">
                <BrandText text={profile.owner} fontSize={72} />
              </View>
              <View className="absolute top-24 sm:top-16 left-[34%]">
                <BrandText text="Playlist" fontSize={30} />
              </View>
              <View className="absolute top-36 sm:top-28 left-[35%]">
                <Counter inputText={profile.playlist_count.toString()} />
              </View>
              <View className="absolute top-24 sm:top-16 left-[56%]">
                <BrandText text="Ratings" fontSize={30} />
              </View>
              <View className="absolute top-36 sm:top-28 left-[57%]">
                <Counter inputText={profile.playlist_count.toString()} />
              </View>
              <View className="absolute top-24 sm:top-16 left-[79%]">
                <BrandText text="Rating" fontSize={30} />
              </View>
              <View className="absolute top-36 sm:top-28 left-[79%]">
                <Counter inputText={profile.playlist_count.toString()} />
              </View>
            </View>
          </>
        )}
      </ImageBackground>
    </View>
  );
}