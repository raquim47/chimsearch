import Modal from "@/components/common/Modal";
import VideoDetail from "@/components/videos/VideoDetail";
import { Suspense } from "react";

const DetailPage = ({ params }: { params: { videoId: string } }) => {
  const videoId = params.videoId;
  return (
    <Suspense fallback={null}>
      <Modal>
        <VideoDetail videoId={videoId} />
      </Modal>
    </Suspense>
  );
};

export default DetailPage;