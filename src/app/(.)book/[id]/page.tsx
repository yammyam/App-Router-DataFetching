import Modal from "@/components/modal";
import BookPage from "@/app/book/[id]/page";
export default function Page(props: any) {
  return (
    <div>
      <Modal>
        <BookPage {...props} />
      </Modal>
    </div>
  );
}
