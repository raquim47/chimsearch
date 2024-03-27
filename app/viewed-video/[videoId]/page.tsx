import Modal from "@/components/common/Modal";
import VideoDetail from "@/components/videos/VideoDetail";
import { fetchVideoTitle } from "@/services/youtube";
import { MetadataProps } from "@/utils/types";

export const generateMetadata = async ({ params }: MetadataProps) => {
  try {
    const title = await fetchVideoTitle(params.videoId);
    return {
      title: title,
    };
  } catch (error) {
    console.error('Error fetching video title:', error);
    return {
      title: '영상 정보를 불러오는 데 실패했습니다.',
    };
  }
};

const DetailPage = ({ params }: { params: { videoId: string } }) => {
  const videoId = params.videoId;
  return (
    <Modal>
      <VideoDetail videoId={videoId} />
    </Modal>
  );
};

export default DetailPage;