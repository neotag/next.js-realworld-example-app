import Link from "next/Link";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { IState } from "../types";

const mapStateToProps = (state: IState) => ({ ...state });

const mapDispatchToProps = (dispatch: Dispatch) => ({});

type HomeProps = IState;

const Home = (props: HomeProps) => {
  console.log("aaa", props);
  return (
    <div>
      <p>Welcome to Next.js!?</p>
      <p>
        <Link href="/register">
          <a>Sign in / Sign up</a>
        </Link>
      </p>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
