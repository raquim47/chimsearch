import Modal from "@/components/common/Modal";
import VideoDetail from "@/components/videos/VIdeoDetail";

const DetailPage = ({ params }: { params: { videoId: string } }) => {
  const videoId = params.videoId;
  return (
    <Modal>
      <VideoDetail videoId={videoId} />
    </Modal>
  );
};

export default DetailPage;